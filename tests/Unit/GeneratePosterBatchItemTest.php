<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Jobs\Ai\GeneratePosterBatchItem;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use ReflectionClass;
use Tests\TestCase;

class GeneratePosterBatchItemTest extends TestCase
{
    public function test_it_formats_data_uri_reference_images_for_openrouter(): void
    {
        $bytes = 'reference-image-bytes';
        $reference = $this->formatReferenceImage('data:image/png;base64,'.base64_encode($bytes));

        $this->assertSame([
            'type' => 'image_url',
            'image_url' => [
                'url' => 'data:image/png;base64,'.base64_encode($bytes),
            ],
        ], $reference);
    }

    public function test_it_formats_image_url_reference_payloads_for_openrouter(): void
    {
        $bytes = 'image-url-reference-bytes';
        $reference = $this->formatReferenceImage([
            'type' => 'image_url',
            'image_url' => [
                'url' => 'data:image/png;base64,'.base64_encode($bytes),
            ],
        ]);

        $this->assertSame([
            'type' => 'image_url',
            'image_url' => [
                'url' => 'data:image/png;base64,'.base64_encode($bytes),
            ],
        ], $reference);
    }

    public function test_it_generates_poster_images_through_openrouter_images_api(): void
    {
        Storage::fake('public');
        Http::preventStrayRequests();
        Http::fake([
            'https://openrouter.ai/api/v1/images' => Http::response([
                'data' => [
                    [
                        'b64_json' => base64_encode('generated-image-bytes'),
                        'media_type' => 'image/png',
                    ],
                ],
            ]),
        ]);

        config([
            'ai.default_image_model' => 'x-ai/grok-imagine-image-2.0',
            'services.openai.api_key' => 'test-openai-key',
            'app.url' => 'https://example.test',
            'app.name' => 'TryPost',
        ]);

        $referenceBytes = 'reference-image-bytes';
        $path = $this->generatePosterImage(
            'A polished poster',
            ['data:image/png;base64,'.base64_encode($referenceBytes)],
        );

        $this->assertIsString($path);
        $this->assertStringStartsWith('posters/poster-', $path);
        Storage::disk('public')->assertExists($path);
        $this->assertSame('generated-image-bytes', Storage::disk('public')->get($path));

        Http::assertSent(function (Request $request) use ($referenceBytes) {
            return $request->url() === 'https://openrouter.ai/api/v1/images'
                && $request->hasHeader('Authorization', 'Bearer test-openai-key')
                && $request['model'] === 'x-ai/grok-imagine-image-2.0'
                && $request['resolution'] === '1K'
                && $request['aspect_ratio'] === '1:1'
                && $request['quality'] === 'low'
                && $request['n'] === 1
                && data_get($request->data(), 'input_references.0.type') === 'image_url'
                && data_get($request->data(), 'input_references.0.image_url.url') === 'data:image/png;base64,'.base64_encode($referenceBytes);
        });
    }

    /**
     * @return array{type: string, image_url: array{url: string}}|null
     */
    private function formatReferenceImage(mixed $reference): ?array
    {
        $job = new GeneratePosterBatchItem('poster-batch-item-id');
        $method = (new ReflectionClass($job))->getMethod('formatReferenceImage');
        $method->setAccessible(true);

        return $method->invoke($job, $reference);
    }

    private function generatePosterImage(string $prompt, array $references): ?string
    {
        $job = new GeneratePosterBatchItem('poster-batch-item-id');
        $method = (new ReflectionClass($job))->getMethod('generatePosterImage');
        $method->setAccessible(true);

        return $method->invoke($job, null, $prompt, $references);
    }
}
