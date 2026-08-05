<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAiCredit extends Model
{
    protected $fillable = [
        'user_id',
        'total_allowed_ai_images',
        'total_allowed_ai_video',
        'total_allowed_ai_use',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
