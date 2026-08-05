<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VideoBatchItem extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'video_batch_id',
        'post_id',
        'plan_data',
        'status',
        'video_path',
        'error',
    ];

    protected function casts(): array
    {
        return [
            'plan_data' => 'array',
        ];
    }

    public function batch(): BelongsTo
    {
        return $this->belongsTo(VideoBatch::class, 'video_batch_id');
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
