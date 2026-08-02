<?php

declare(strict_types=1);

use App\Enums\Post\Status as PostStatus;
use App\Models\Post;
use App\Support\PostStatusRules;

test('blocks editing for terminal statuses', function (PostStatus $status) {
    $post = Post::factory()->make(['status' => $status]);

    expect(PostStatusRules::blocksEditing($post))->toBeTrue();
})->with([
    PostStatus::Publishing,
    PostStatus::Published,
    PostStatus::PartiallyPublished,
    PostStatus::Failed,
]);

test('allows editing for non terminal statuses', function (PostStatus $status) {
    $post = Post::factory()->make(['status' => $status]);

    expect(PostStatusRules::blocksEditing($post))->toBeFalse();
})->with([
    PostStatus::Draft,
    PostStatus::Scheduled,
]);

test('blocks deletion for publishing status', function () {
    $post = Post::factory()->make(['status' => PostStatus::Publishing]);

    expect(PostStatusRules::blocksDeletion($post))->toBeTrue();
});

test('allows deletion for published, partially published, draft, scheduled and failed statuses', function (PostStatus $status) {
    $post = Post::factory()->make(['status' => $status]);

    expect(PostStatusRules::blocksDeletion($post))->toBeFalse();
})->with([
    PostStatus::Published,
    PostStatus::PartiallyPublished,
    PostStatus::Draft,
    PostStatus::Scheduled,
    PostStatus::Failed,
]);
