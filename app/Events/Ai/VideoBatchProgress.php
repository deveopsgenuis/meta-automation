<?php

declare(strict_types=1);

namespace App\Events\Ai;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VideoBatchProgress implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @param  array<string, mixed>|null  $itemData
     */
    public function __construct(
        public string $userId,
        public string $batchId,
        public string $itemId,
        public string $status,
        public int $completedItems,
        public int $totalItems,
        public int $failedItems,
        public ?array $itemData = null,
        public ?string $error = null,
    ) {}

    public function broadcastAs(): string
    {
        return 'video.batch.progress';
    }

    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel("user.{$this->userId}.video-batch.{$this->batchId}");
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'batch_id' => $this->batchId,
            'item_id' => $this->itemId,
            'status' => $this->status,
            'completed_items' => $this->completedItems,
            'total_items' => $this->totalItems,
            'failed_items' => $this->failedItems,
            'item' => $this->itemData,
            'error' => $this->error,
        ];
    }

    public function broadcastQueue(): string
    {
        return 'broadcasts';
    }
}
