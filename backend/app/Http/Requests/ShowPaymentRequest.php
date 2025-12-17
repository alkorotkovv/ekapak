<?php

namespace App\Http\Requests;

class ShowPaymentRequest extends BaseRequest
{

    public function rules(): array
    {
        return [
            'uuid' => ['required', 'uuid'],
        ];
    }

    public function messages(): array
    {
        return [
            'uuid.required' => 'UUID обязателен для заполнения.',
            'uuid.uuid' => 'Неверный формат UUID.',
        ];
    }

    /**
     * Подготовка данных для валидации
     * Добавляем параметр uuid из пути в данные для валидации
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'uuid' => $this->route('uuid'),
        ]);
    }
}
