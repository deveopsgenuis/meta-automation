<?php

declare(strict_types=1);

namespace App\Http\Requests\App\Ai;

use Illuminate\Foundation\Http\FormRequest;

class GenerateShortVideoPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'total_videos' => ['required', 'integer', 'min:1', 'max:10'],
            'start_date' => ['nullable', 'date'],
            'social_account_id' => ['nullable', 'string', 'exists:social_accounts,id'],
            'instruction' => ['nullable', 'string', 'max:1000'],
            'size' => ['nullable', 'string', 'in:1:1,9:16,16:9'],
            'quality' => ['nullable', 'string', 'in:720p,1080p'],
            'provider' => ['nullable', 'string'],
        ];
    }
}
