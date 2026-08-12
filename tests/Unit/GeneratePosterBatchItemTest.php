<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Jobs\Ai\GeneratePosterBatchItem;
use Laravel\Ai\Files\Base64Image;
use Laravel\Ai\Files\Image as AiImageFile;
use Laravel\Ai\Files\LocalImage;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

class GeneratePosterBatchItemTest extends TestCase
{
    public function test_it_converts_data_uri_reference_images_to_local_image_attachments_for_image_generation(): void
    {
        $bytes = 'reference-image-bytes';
        $attachment = $this->parseReferenceImage('data:image/png;base64,'.base64_encode($bytes));

        $this->assertLocalImageAttachment($attachment, $bytes, 'image/png');
    }

    public function test_it_converts_image_url_reference_payloads_to_local_image_attachments(): void
    {
        $bytes = 'image-url-reference-bytes';
        $attachment = $this->parseReferenceImage([
            'type' => 'image_url',
            'image_url' => [
                'url' => 'data:image/png;base64,'.base64_encode($bytes),
            ],
        ]);

        $this->assertLocalImageAttachment($attachment, $bytes, 'image/png');
    }

    public function test_it_converts_base64_image_instances_to_local_image_attachments(): void
    {
        $bytes = 'base64-image-instance-bytes';
        $attachment = $this->parseReferenceImage(AiImageFile::fromBase64(base64_encode($bytes), 'image/png'));

        $this->assertLocalImageAttachment($attachment, $bytes, 'image/png');
    }

    private function parseReferenceImage(mixed $referenceImage): LocalImage
    {
        $job = new GeneratePosterBatchItem('poster-batch-item-id');
        $reflection = new ReflectionClass($job);

        $parseReferenceImage = $reflection->getMethod('parseReferenceImage');
        $parseReferenceImage->setAccessible(true);

        $attachment = $parseReferenceImage->invoke($job, $referenceImage);

        $this->assertInstanceOf(LocalImage::class, $attachment);

        return $attachment;
    }

    private function assertLocalImageAttachment(LocalImage $attachment, string $expectedBytes, string $expectedMimeType): void
    {
        $this->assertNotInstanceOf(Base64Image::class, $attachment);
        $this->assertSame($expectedMimeType, $attachment->mimeType());
        $this->assertFileExists($attachment->path);
        $this->assertSame($expectedBytes, file_get_contents($attachment->path));

        $temporaryPath = $attachment->path;
        $this->deleteTemporaryReferenceImages($attachment);

        $this->assertFileDoesNotExist($temporaryPath);
    }

    private function deleteTemporaryReferenceImages(LocalImage $attachment): void
    {
        if (is_file($attachment->path)) {
            unlink($attachment->path);
        }
    }
}
