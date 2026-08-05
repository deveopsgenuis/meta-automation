<?php

declare(strict_types=1);

use App\Http\Resources\App\HandleInertiaRequests\AuthUserResource;
use App\Models\User;
use App\Services\Ai\UserAiCreditService;

test('new user gets default ai credits via observer', function () {
    $user = User::factory()->create();

    $credit = $user->userAiCredit;

    expect($credit)->not->toBeNull()
        ->and($credit->total_allowed_ai_images)->toBe(150)
        ->and($credit->total_allowed_ai_video)->toBe(10)
        ->and($credit->total_allowed_ai_use)->toBe(250);
});

test('consumeImage decrements image credits', function () {
    $user = User::factory()->create();
    expect(UserAiCreditService::remainingImage($user))->toBe(150);

    UserAiCreditService::consumeImage($user);

    expect(UserAiCreditService::remainingImage($user))->toBe(149);
});

test('consumeVideo decrements video credits', function () {
    $user = User::factory()->create();
    expect(UserAiCreditService::remainingVideo($user))->toBe(10);

    UserAiCreditService::consumeVideo($user);

    expect(UserAiCreditService::remainingVideo($user))->toBe(9);
});

test('consumeUse decrements use credits', function () {
    $user = User::factory()->create();
    expect(UserAiCreditService::remainingUse($user))->toBe(250);

    UserAiCreditService::consumeUse($user);

    expect(UserAiCreditService::remainingUse($user))->toBe(249);
});

test('cannot consume below zero', function () {
    $user = User::factory()->create();

    $user->userAiCredit->update([
        'total_allowed_ai_images' => 0,
        'total_allowed_ai_video' => 0,
        'total_allowed_ai_use' => 0,
    ]);

    UserAiCreditService::consumeImage($user);
    UserAiCreditService::consumeVideo($user);
    UserAiCreditService::consumeUse($user);

    expect(UserAiCreditService::remainingImage($user))->toBe(0)
        ->and(UserAiCreditService::remainingVideo($user))->toBe(0)
        ->and(UserAiCreditService::remainingUse($user))->toBe(0);
});

test('canGenerateImage returns false when exhausted', function () {
    $user = User::factory()->create();
    $user->userAiCredit->update(['total_allowed_ai_images' => 0]);

    expect(UserAiCreditService::canGenerateImage($user))->toBeFalse();
});

test('canGenerateVideo returns false when exhausted', function () {
    $user = User::factory()->create();
    $user->userAiCredit->update(['total_allowed_ai_video' => 0]);

    expect(UserAiCreditService::canGenerateVideo($user))->toBeFalse();
});

test('canUseAi returns false when exhausted', function () {
    $user = User::factory()->create();
    $user->userAiCredit->update(['total_allowed_ai_use' => 0]);

    expect(UserAiCreditService::canUseAi($user))->toBeFalse();
});

test('userAiCredit relationship returns null for user without credit record', function () {
    $user = User::factory()->create();

    // Manually delete the credit created by observer
    $user->userAiCredit()->delete();

    expect($user->fresh()->userAiCredit)->toBeNull();
});

test('auth user resource includes user_ai_credit', function () {
    $user = User::factory()->create();

    $resource = AuthUserResource::make($user);

    expect($resource['user_ai_credit'])
        ->toBeArray()
        ->toHaveKeys(['total_allowed_ai_images', 'total_allowed_ai_video', 'total_allowed_ai_use'])
        ->and($resource['user_ai_credit']['total_allowed_ai_images'])->toBe(150)
        ->and($resource['user_ai_credit']['total_allowed_ai_video'])->toBe(10)
        ->and($resource['user_ai_credit']['total_allowed_ai_use'])->toBe(250);
});
