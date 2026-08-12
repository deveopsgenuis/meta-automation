<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Jobs\Ai\GeneratePosterBatchItem;
use Laravel\Ai\Files\Base64Image;
use Laravel\Ai\Files\LocalImage;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class GeneratePosterBatchItemTest extends TestCase
{
    public function test_it_converts_data_uri_reference_images_to_local_image_attachments_for_image_generation(): void
    {
        $job = new GeneratePosterBatchItem('poster-batch-item-id');
        $reflection = new ReflectionClass($job);

        $parseReferenceImage = $reflection->getMethod('parseReferenceImage');
        $parseReferenceImage->setAccessible(true);

        $deleteTemporaryReferenceImages = $reflection->getMethod('deleteTemporaryReferenceImages');
        $deleteTemporaryReferenceImages->setAccessible(true);

        $bytes = 'reference-image-bytes';
        $attachment = $parseReferenceImage->invoke(
            $job,
            'data:image/png;base64,'.base64_encode($bytes),
        );

        $this->assertInstanceOf(LocalImage::class, $attachment);
        $this->assertNotInstanceOf(Base64Image::class, $attachment);
        $this->assertSame('image/png', $attachment->mimeType());
        $this->assertFileExists($attachment->path);
        $this->assertSame($bytes, file_get_contents($attachment->path));

        $temporaryPath = $attachment->path;

        $deleteTemporaryReferenceImages->invoke($job);

        $this->assertFileDoesNotExist($temporaryPath);
    }
}
