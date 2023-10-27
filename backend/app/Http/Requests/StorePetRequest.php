<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;

class StorePetRequest extends FormRequest
{

    /**
     * Authentication is automatic in this stub application
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validates Pet json data provided
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'type' => [
                'required',
                Rule::in(['dog', 'cat'])
            ],
            'breed' => [
                'bail',
                'required_without:nobreedReason',
                'string',
                Rule::exists('breeds','name')->where(function (Builder $query) {
                    return $query->where('type', $this->get("type"));
                }),
            ],
            'nobreedReason' =>             [
                'required_without:breed',
                Rule::in(['unknown', 'mix'])
            ],
            'mixbreed' => 'required_if:nobreedReason,mix|string|max:255',
            'gender' => [
                'required',
                Rule::in(['male', 'female']),
            ]
        ];
    }
}
