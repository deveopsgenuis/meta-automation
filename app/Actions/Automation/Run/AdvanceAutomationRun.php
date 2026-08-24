<?php

declare(strict_types=1);

namespace App\Actions\Automation\Run;

use App\Enums\Automation\Run\Status;
use App\Jobs\Automation\ProcessAutomationNode;
use App\Models\Automation;
use App\Models\AutomationRun;
use Illuminate\Support\Facades\Log;
use Throwable;

class AdvanceAutomationRun
{
    public function __invoke(AutomationRun $run, string $fromNodeId, string $handle = 'default'): void
    {
        $targets = $this->targetsFor($run->automation, $fromNodeId, $handle);

        Log::info('AdvanceAutomationRun: resolving targets', [
            'run_id' => $run->id,
            'from_node_id' => $fromNodeId,
            'handle' => $handle,
            'target_count' => count($targets),
            'targets' => $targets,
        ]);

        if ($targets === []) {
            Log::info('AdvanceAutomationRun: no more targets, completing run', [
                'run_id' => $run->id,
                'from_node_id' => $fromNodeId,
                'handle' => $handle,
            ]);

            $run->update([
                'status' => Status::Completed,
                'finished_at' => now(),
                'current_node_id' => null,
                'error' => [
                    'reason' => 'no_matching_edge',
                    'handle' => $handle,
                    'node_id' => $fromNodeId,
                ],
            ]);

            return;
        }

        $this->dispatchBranches($run, $targets);
    }

    /**
     * Every node id connected to `$fromNodeId` via the given handle. A node can
     * fan out to several targets (e.g. a trigger calling RSS and HTTP at once).
     *
     * @return array<int, string>
     */
    public function targetsFor(Automation $automation, string $fromNodeId, string $handle = 'default'): array
    {
        return collect($automation->connections ?? [])
            ->filter(fn ($c) => data_get($c, 'source') === $fromNodeId && data_get($c, 'source_handle', 'default') === $handle)
            ->pluck('target')
            ->filter()
            ->values()
            ->all();
    }

    /**
     * Continues the run on the first branch and forks a sibling run — sharing the
     * accumulated context — for every additional branch, so all targets execute.
     *
     * @param  array<int, string>  $targets
     */
    public function dispatchBranches(AutomationRun $run, array $targets): void
    {
        $first = array_shift($targets);

        Log::info('AdvanceAutomationRun: dispatching branches', [
            'run_id' => $run->id,
            'first_target' => $first,
            'sibling_count' => count($targets),
            'sibling_targets' => $targets,
            'is_manual' => $run->is_manual,
        ]);

        foreach ($targets as $target) {
            $sibling = AutomationRun::create([
                'automation_id' => $run->automation_id,
                'root_run_id' => $run->rootId(),
                'trigger_item_id' => $run->trigger_item_id,
                'generated_post_id' => $run->generated_post_id,
                'is_manual' => $run->is_manual,
                'is_dry_run' => $run->is_dry_run,
                'status' => Status::Pending,
                'context' => $run->context,
            ]);

            Log::info('AdvanceAutomationRun: dispatching sibling run', [
                'sibling_run_id' => $sibling->id,
                'target_node_id' => $target,
            ]);

            $this->dispatchNode($sibling, $target);
        }

        Log::info('AdvanceAutomationRun: dispatching main branch', [
            'run_id' => $run->id,
            'target_node_id' => $first,
        ]);

        $this->dispatchNode($run, $first);
    }

    private function dispatchNode(AutomationRun $run, string $nodeId): void
    {
        try {
            if ($run->is_manual) {
                Log::info('AdvanceAutomationRun: dispatching sync for manual run', [
                    'run_id' => $run->id,
                    'node_id' => $nodeId,
                ]);

                app()->make(ProcessAutomationNode::class, ['run' => $run, 'nodeId' => $nodeId])->handle(
                    app(AdvanceAutomationRun::class),
                );

                Log::info('AdvanceAutomationRun: sync dispatch completed', [
                    'run_id' => $run->id,
                    'node_id' => $nodeId,
                ]);

                return;
            }

            ProcessAutomationNode::dispatch($run, $nodeId);

            Log::info('AdvanceAutomationRun: async dispatch succeeded', [
                'run_id' => $run->id,
                'node_id' => $nodeId,
            ]);
        } catch (Throwable $e) {
            Log::error('AdvanceAutomationRun: dispatch failed', [
                'run_id' => $run->id,
                'node_id' => $nodeId,
                'error' => $e->getMessage(),
                'exception_class' => $e::class,
            ]);

            throw $e;
        }
    }
}
