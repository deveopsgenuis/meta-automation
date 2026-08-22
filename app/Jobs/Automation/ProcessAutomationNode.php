<?php

declare(strict_types=1);

namespace App\Jobs\Automation;

use App\Actions\Automation\Node\RunConditionNode;
use App\Actions\Automation\Node\RunDelayNode;
use App\Actions\Automation\Node\RunEndNode;
use App\Actions\Automation\Node\RunFetchRssNode;
use App\Actions\Automation\Node\RunGenerateNode;
use App\Actions\Automation\Node\RunGeneratePosterNode;
use App\Actions\Automation\Node\RunHttpRequestNode;
use App\Actions\Automation\Node\RunPublishNode;
use App\Actions\Automation\Node\RunWebhookNode;
use App\Actions\Automation\Run\AdvanceAutomationRun;
use App\DataTransferObjects\Automation\NodeRunResult;
use App\Enums\Automation\Node\Type as NodeType;
use App\Enums\Automation\NodeRun\Status as NodeRunStatus;
use App\Enums\Automation\Run\Status as RunStatus;
use App\Enums\Automation\Status as AutomationStatus;
use App\Models\AutomationNodeRun;
use App\Models\AutomationRun;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use LogicException;
use Throwable;

class ProcessAutomationNode implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 1;

    public function __construct(
        public AutomationRun $run,
        public string $nodeId,
    ) {
        $this->onQueue('automations');
    }

    public function handle(AdvanceAutomationRun $advance): void
    {
        $this->run->refresh();

        Log::info('ProcessAutomationNode: starting', [
            'run_id' => $this->run->id,
            'node_id' => $this->nodeId,
            'run_status' => $this->run->status->value,
            'is_manual' => $this->run->is_manual,
            'automation_status' => $this->run->automation->status->value,
        ]);

        if (! in_array($this->run->status, [RunStatus::Pending, RunStatus::Running, RunStatus::Waiting], true)) {
            Log::info('ProcessAutomationNode: skipping — run status not processable', [
                'run_id' => $this->run->id,
                'status' => $this->run->status->value,
            ]);

            return;
        }

        if (! $this->run->is_manual && $this->run->automation->status !== AutomationStatus::Active) {
            Log::info('ProcessAutomationNode: skipping — automation not active', [
                'run_id' => $this->run->id,
                'automation_id' => $this->run->automation_id,
                'automation_status' => $this->run->automation->status->value,
            ]);

            return;
        }

        $node = collect($this->run->automation->nodes ?? [])->firstWhere('id', $this->nodeId);

        if ($node === null) {
            Log::error('ProcessAutomationNode: node not found in automation', [
                'run_id' => $this->run->id,
                'node_id' => $this->nodeId,
                'automation_id' => $this->run->automation_id,
                'available_nodes' => collect($this->run->automation->nodes ?? [])->pluck('id')->values()->all(),
            ]);

            $this->run->update([
                'status' => RunStatus::Failed,
                'error' => ['message' => __('automations.errors.node_no_longer_exists', ['node_id' => $this->nodeId])],
                'finished_at' => now(),
            ]);

            return;
        }

        $nodeType = NodeType::from($node['type']);

        Log::info('ProcessAutomationNode: executing node', [
            'run_id' => $this->run->id,
            'node_id' => $this->nodeId,
            'node_type' => $nodeType->value,
            'config_keys' => array_keys($node['data'] ?? []),
        ]);

        $this->run->update([
            'status' => RunStatus::Running,
            'current_node_id' => $this->nodeId,
            'started_at' => $this->run->started_at ?? now(),
        ]);

        $nodeRun = AutomationNodeRun::create([
            'run_id' => $this->run->id,
            'node_id' => $this->nodeId,
            'node_type' => $nodeType,
            'status' => NodeRunStatus::Running,
            'input' => $this->run->context,
            'started_at' => now(),
        ]);

        try {
            $result = $this->executeNode($nodeType, $node['data'] ?? []);

            Log::info('ProcessAutomationNode: node executed successfully', [
                'run_id' => $this->run->id,
                'node_id' => $this->nodeId,
                'node_type' => $nodeType->value,
                'result_status' => $result->status->value,
                'result_next_handle' => $result->nextHandle,
                'has_error' => $result->error !== null,
                'output' => $result->output,
            ]);
        } catch (Throwable $e) {
            Log::error('ProcessAutomationNode: node execution threw exception', [
                'run_id' => $this->run->id,
                'node_id' => $this->nodeId,
                'node_type' => $nodeType->value,
                'exception_class' => $e::class,
                'exception_message' => $e->getMessage(),
                'exception_file' => $e->getFile(),
                'exception_line' => $e->getLine(),
            ]);

            $result = NodeRunResult::failed($e->getMessage(), ['class' => $e::class]);
        }

        $nodeRun->update([
            'status' => $result->status,
            'output' => $result->output,
            'error' => $result->error,
            'finished_at' => now(),
        ]);

        if ($result->status === NodeRunStatus::Failed) {
            Log::error('ProcessAutomationNode: node failed', [
                'run_id' => $this->run->id,
                'node_id' => $this->nodeId,
                'node_type' => $nodeType->value,
                'error' => $result->error,
            ]);

            $this->run->update([
                'status' => RunStatus::Failed,
                'error' => array_merge(['node_id' => $this->nodeId], $result->error ?? []),
                'finished_at' => now(),
            ]);

            return;
        }

        $this->run->update([
            'context' => array_merge($this->run->context ?? [], $result->output),
        ]);

        if ($result->sleepUntil !== null) {
            Log::info('ProcessAutomationNode: node sleeping until', [
                'run_id' => $this->run->id,
                'node_id' => $this->nodeId,
                'sleep_until' => $result->sleepUntil->toIso8601String(),
            ]);

            $this->run->update([
                'status' => RunStatus::Waiting,
                'next_action_at' => $result->sleepUntil,
            ]);

            return;
        }

        Log::info('ProcessAutomationNode: advancing to next node', [
            'run_id' => $this->run->id,
            'from_node_id' => $this->nodeId,
            'next_handle' => $result->nextHandle,
        ]);

        $advance($this->run, $this->nodeId, $result->nextHandle);
    }

    public function failed(?Throwable $e): void
    {
        $this->run->refresh();

        Log::error('ProcessAutomationNode: job failed (Laravel exception handler)', [
            'run_id' => $this->run->id,
            'node_id' => $this->nodeId,
            'exception_message' => $e?->getMessage(),
            'exception_class' => $e::class,
            'run_status' => $this->run->status->value,
        ]);

        if (in_array($this->run->status, [RunStatus::Completed, RunStatus::Failed], true)) {
            return;
        }

        $this->run->update([
            'status' => RunStatus::Failed,
            'error' => ['message' => $e?->getMessage() ?? 'job failed', 'node_id' => $this->nodeId],
            'finished_at' => now(),
        ]);
    }

    private function executeNode(NodeType $type, array $config): NodeRunResult
    {
        $handler = match ($type) {
            NodeType::Generate => app(RunGenerateNode::class),
            NodeType::GeneratePoster => app(RunGeneratePosterNode::class),
            NodeType::Delay => app(RunDelayNode::class),
            NodeType::Condition => app(RunConditionNode::class),
            NodeType::Publish => app(RunPublishNode::class),
            NodeType::Webhook => app(RunWebhookNode::class),
            NodeType::End => app(RunEndNode::class),
            NodeType::FetchRss => app(RunFetchRssNode::class),
            NodeType::HttpRequest => app(RunHttpRequestNode::class),
            NodeType::Trigger => throw new LogicException('Trigger nodes are not executed as run steps.'),
        };

        return $handler($this->run, $config);
    }
}
