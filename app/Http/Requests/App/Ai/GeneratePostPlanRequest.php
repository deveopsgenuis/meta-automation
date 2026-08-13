<?php

declare(strict_types=1);

namespace App\Http\Requests\App\Ai;

use Illuminate\Foundation\Http\FormRequest;

class GeneratePostPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'total_posts' => ['required', 'integer', 'min:1', 'max:31'],
            'start_date' => ['nullable', 'date'],
            'social_account_id' => ['nullable', 'string', 'exists:social_accounts,id'],
            'instruction' => ['nullable', 'string', 'max:1000'],
            'provider' => ['nullable', 'string', 'in:openai,gemini,anthropic'],
            'reference_images' => ['nullable', 'array', 'max:6'],
            'reference_images.*' => ['string'],
        ];
    }
}
