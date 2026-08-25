<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SocialAccount\Platform;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlatformCredential extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    protected $hidden = [
        'client_secret',
    ];

    protected $casts = [
        'extra' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function platformEnum(): ?Platform
    {
        return Platform::tryFrom($this->platform);
    }

    public function scopeForPlatform($query, Platform|string $platform)
    {
        $value = $platform instanceof Platform ? $platform->value : $platform;

        return $query->where('platform', $value);
    }
}
