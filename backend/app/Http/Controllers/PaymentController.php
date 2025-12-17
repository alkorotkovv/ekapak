<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\PaymentLog;
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

    /**
     * Получение информации о платеже по UUID
     * 
     * @param string $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $uuid)
    {
        // Находим платеж по uuid
        $payment = Payment::where('uuid', $uuid)->first();

        // Если платеж не найден - возвращаем 404
        if (!$payment) {
            return response()->json([
                'message' => 'Платеж не найден',
            ], 404);
        }

        // Возвращаем все поля модели
        return response()->json([
            'uuid' => $payment->uuid,
            'amount' => $payment->amount,
            'currency' => $payment->currency,
            'status' => $payment->status,
            'created_at' => $payment->created_at,
            'updated_at' => $payment->updated_at,
        ], 200);
    }

    /**
     * Обработка платежа (симуляция успеха или неудачи)
     * 
     * @param Request $request
     * @param string $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function process(Request $request, string $uuid)
    {
        // Находим платеж по uuid
        $payment = Payment::where('uuid', $uuid)->first();

        // Если платеж не найден - возвращаем 404
        if (!$payment) {
            return response()->json([
                'message' => 'Платеж не найден',
            ], 404);
        }

        // Проверяем, что статус 'pending' - иначе не позволяем обработку
        if ($payment->status !== Payment::STATUS_PENDING) {
            return response()->json([
                'message' => 'Платеж уже обработан. Текущий статус: ' . $payment->status,
            ], 400);
        }

        // Получаем параметр success (валидация будет добавлена позже)
        $success = $request->input('success');

        // Обновляем статус в зависимости от параметра success
        $payment->status = $success 
            ? Payment::STATUS_SUCCESS 
            : Payment::STATUS_FAILED;
        $payment->save();

        // Логируем событие обработки
        PaymentLog::create([
            'payment_uuid' => $payment->uuid,
            'action' => $success 
                ? PaymentLog::ACTION_PROCESSED_SUCCESS 
                : PaymentLog::ACTION_PROCESSED_FAILED,
            'timestamp' => now(),
        ]);

        // Возвращаем обновленную информацию о платеже
        return response()->json([
            'uuid' => $payment->uuid,
            'amount' => $payment->amount,
            'currency' => $payment->currency,
            'status' => $payment->status,
            'created_at' => $payment->created_at,
            'updated_at' => $payment->updated_at,
        ], 200);
    }
}
