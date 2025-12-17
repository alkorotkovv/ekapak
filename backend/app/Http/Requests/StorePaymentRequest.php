<?php

namespace App\Http\Requests;

use App\Models\Payment;

class StorePaymentRequest extends BaseRequest
{

    public function rules(): array
    {
        return [
            'amount' => ['required', 'numeric', 'min:1'],
            'currency' => ['required', 'string', 'in:' . Payment::CURRENCY_RUB . ',' . Payment::CURRENCY_EUR . ',' . Payment::CURRENCY_USD],
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required' => 'Поле "amount" обязательно для заполнения.',
            'amount.numeric' => 'Поле "amount" должно быть числом.',
            'amount.min' => 'Поле "amount" должно быть не менее 1.',
            'currency.required' => 'Поле "currency" обязательно для заполнения.',
            'currency.in' => 'Поле "currency" должно быть одним из значений: RUB, EUR, USD.',
        ];
    }
}
