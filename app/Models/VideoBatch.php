<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VideoBatch extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'workspace_id',
        'user_id',
        'social_account_id',
        'plan',
        'status',
        'size',
        'quality',
        'total_items',
        'completed_items',
        'failed_items',
    ];

    protected function casts(): array
    {
        return [
            'plan' => 'array',
            'total_items' => 'integer',
            'completed_items' => 'integer',
            'failed_items' => 'integer',
        ];
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function socialAccount(): BelongsTo
    {
        return $this->belongsTo(SocialAccount::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(VideoBatchItem::class);
    }

    public function isCompleted(): bool
    {
        return $this->completed_items + $this->failed_items >= $this->total_items;
    }
}
