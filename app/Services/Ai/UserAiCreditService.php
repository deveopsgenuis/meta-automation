<?php

declare(strict_types=1);

namespace App\Services\Ai;

use App\Models\User;

class UserAiCreditService
{
    public static function remainingImage(User $user): int
    {
        return (int) ($user->userAiCredit?->total_allowed_ai_images ?? 0);
    }

    public static function remainingVideo(User $user): int
    {
        return (int) ($user->userAiCredit?->total_allowed_ai_video ?? 0);
    }

    public static function remainingUse(User $user): int
    {
        return (int) ($user->userAiCredit?->total_allowed_ai_use ?? 0);
    }

    public static function canGenerateImage(User $user): bool
    {
        return self::remainingImage($user) > 0;
    }

    public static function canGenerateVideo(User $user): bool
    {
        return self::remainingVideo($user) > 0;
    }

    public static function canUseAi(User $user): bool
    {
        return self::remainingUse($user) > 0;
    }

    public static function consumeImage(User $user): void
    {
        $credit = $user->userAiCredit;
        if ($credit && $credit->total_allowed_ai_images > 0) {
            $credit->decrement('total_allowed_ai_images');
        }
    }

    public static function consumeVideo(User $user): void
    {
        $credit = $user->userAiCredit;
        if ($credit && $credit->total_allowed_ai_video > 0) {
            $credit->decrement('total_allowed_ai_video');
        }
    }

    public static function consumeUse(User $user): void
    {
        $credit = $user->userAiCredit;
        if ($credit && $credit->total_allowed_ai_use > 0) {
            $credit->decrement('total_allowed_ai_use');
        }
    }
}
