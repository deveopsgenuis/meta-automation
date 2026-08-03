<?php

declare(strict_types=1);

namespace App\Http\Requests\App\Ai;

use Illuminate\Foundation\Http\FormRequest;

class GeneratePosterDesignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'prompt' => ['exclude_if:bulk,true', 'required', 'string', 'min:3'],
            'prompts' => ['exclude_unless:bulk,true', 'required', 'array', 'min:1'],
            'prompts.*.id' => ['required', 'string', 'min:1'],
            'prompts.*.prompt' => ['required', 'string', 'min:3'],
            'system_prompt' => ['nullable', 'string'],
            'bulk' => ['nullable', 'boolean'],
            'provider' => ['nullable', 'string', 'in:openai,gemini'],
        ];
    }
}
