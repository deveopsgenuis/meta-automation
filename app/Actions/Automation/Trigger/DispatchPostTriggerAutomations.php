<?php

declare(strict_types=1);

namespace App\Actions\Automation\Trigger;

use App\Actions\Automation\Run\AdvanceAutomationRun;
use App\Enums\Automation\Node\Type as NodeType;
use App\Enums\Automation\Run\Status as RunStatus;
use App\Enums\Automation\Status as AutomationStatus;
use App\Enums\Automation\Trigger\Type as TriggerType;
use App\Models\Automation;
use App\Models\AutomationRun;
use App\Models\Post;
use Illuminate\Support\Facades\Log;

/**
 * Walks the workspace's active automations and dispatches a run for each one
 * whose Trigger node matches the given post-related event (PostPublished /
 * PostScheduled). The post payload is placed at `context.trigger.post` so
 * downstream nodes can reference it via templates like `{{ trigger.post.id }}`.
 *
 * V1 limitation: every post fires triggers, regardless of whether the post
 * itself was created by an automation. If a future use case introduces loops
 * (automation X publishes → trigger fires → X publishes again), we'll need a
 * `posts.created_by_automation_run_id` column to skip them.
 */
class DispatchPostTriggerAutomations
{
    public function __construct(private AdvanceAutomationRun $advance) {}

    public function __invoke(Post $post, TriggerType $triggerType): void
    {
        Log::info('DispatchPostTriggerAutomations: searching for automations', [
            'post_id' => $post->id,
            'workspace_id' => $post->workspace_id,
            'trigger_type' => $triggerType->value,
        ]);

        $automations = Automation::query()
            ->where('workspace_id', $post->workspace_id)
            ->where('status', AutomationStatus::Active)
            ->where('trigger_type', $triggerType->value)
            ->get();

        Log::info('DispatchPostTriggerAutomations: found automations', [
            'post_id' => $post->id,
            'count' => $automations->count(),
            'automation_ids' => $automations->pluck('id')->values()->all(),
        ]);

        foreach ($automations as $automation) {
            $triggerNode = collect($automation->nodes ?? [])->firstWhere('type', NodeType::Trigger->value);

            if ($triggerNode === null) {
                Log::warning('DispatchPostTriggerAutomations: automation has no trigger node', [
                    'automation_id' => $automation->id,
                    'node_count' => count($automation->nodes ?? []),
                ]);

                continue;
            }

            $this->dispatchRun($automation, $triggerNode, $post);
        }
    }

    private function dispatchRun(Automation $automation, array $triggerNode, Post $post): void
    {
        $context = [
            'trigger' => [
                'event' => $triggerNode['data']['trigger_type'],
                'fired_at' => now()->toIso8601String(),
                'post' => [
                    'id' => $post->id,
                    'content' => $post->content,
                    'status' => $post->status->value,
                    'scheduled_at' => $post->scheduled_at?->toIso8601String(),
                    'published_at' => $post->published_at?->toIso8601String(),
                ],
            ],
        ];

        Log::info('DispatchPostTriggerAutomations: dispatching run', [
            'automation_id' => $automation->id,
            'trigger_node_id' => $triggerNode['id'],
            'post_id' => $post->id,
        ]);

        $run = AutomationRun::create([
            'automation_id' => $automation->id,
            'status' => RunStatus::Pending,
            'context' => $context,
        ]);

        $targets = $this->advance->targetsFor($automation, $triggerNode['id']);

        Log::info('DispatchPostTriggerAutomations: resolved targets', [
            'run_id' => $run->id,
            'automation_id' => $automation->id,
            'trigger_node_id' => $triggerNode['id'],
            'target_count' => count($targets),
            'targets' => $targets,
        ]);

        if ($targets === []) {
            Log::error('DispatchPostTriggerAutomations: no edges from trigger node', [
                'run_id' => $run->id,
                'automation_id' => $automation->id,
                'trigger_node_id' => $triggerNode['id'],
                'connections' => $automation->connections ?? [],
            ]);

            $run->update([
                'status' => RunStatus::Failed,
                'error' => ['message' => __('automations.errors.no_trigger_connection')],
                'finished_at' => now(),
            ]);

            return;
        }

        $this->advance->dispatchBranches($run, $targets);
    }
}
