<?php

declare(strict_types=1);

namespace App\Http\Requests\App\Ai;

use Illuminate\Foundation\Http\FormRequest;

class ExecutePostPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'social_account_id' => ['nullable', 'string', 'exists:social_accounts,id'],
            'plan' => ['required', 'array', 'min:1'],
            'plan.*.post_description' => ['required', 'string'],
            'plan.*.post_hashtags' => ['nullable', 'string'],
            'plan.*.post_visual_prompt' => ['required', 'string'],
            'plan.*.poster_size' => ['nullable', 'string'],
            'plan.*.scheduled_date' => ['required', 'string', 'date'],
            'plan.*.scheduled_time' => ['nullable', 'string'],
        ];
    }
}
