<?php

declare(strict_types=1);

namespace App\Http\Requests\App\Ai;

use Illuminate\Foundation\Http\FormRequest;

class ExecuteShortVideoPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'social_account_id' => ['nullable', 'string', 'exists:social_accounts,id'],
            'plan' => ['required', 'array', 'min:1', 'max:10'],
            'plan.*.video_description' => ['required', 'string'],
            'plan.*.video_prompt' => ['required', 'string'],
            'plan.*.scheduled_date' => ['required', 'string', 'date'],
            'plan.*.scheduled_time' => ['nullable', 'string'],
            'plan.*.post_hashtags' => ['nullable', 'string'],
            'size' => ['nullable', 'string', 'in:1:1,9:16,16:9'],
            'quality' => ['nullable', 'string', 'in:720p,1080p'],
        ];
    }
}
