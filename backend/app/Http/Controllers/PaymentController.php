<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Создание нового платежа
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Валидация будет добавлена позже
        // Пока получаем данные напрямую
        $amount = $request->input('amount');
        $currency = $request->input('currency');

        // Создаем платеж со статусом 'pending' (по умолчанию)
        // UUID сгенерируется автоматически в модели
        $payment = Payment::create([
            'amount' => $amount,
            'currency' => $currency,
            'status' => Payment::STATUS_PENDING,
        ]);

        // Возвращаем только payment_uuid с HTTP статусом 201 Created
        return response()->json([
            'payment_uuid' => $payment->uuid,
        ], 201);
    }
}
