<?php

namespace App\Http\Requests;

class ProcessPaymentRequest extends BaseRequest
{

    public function rules(): array
    {
        return [
            'uuid' => ['required', 'uuid'],
            'success' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'uuid.required' => 'UUID обязателен для заполнения.',
            'uuid.uuid' => 'Неверный формат UUID.',
            'success.required' => 'Поле "success" обязательно для заполнения.',
            'success.boolean' => 'Поле "success" должно быть булевым значением (true или false).',
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
