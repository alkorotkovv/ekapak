<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcessPaymentRequest;
use App\Http\Requests\ShowPaymentRequest;
use App\Http\Requests\StorePaymentRequest;
use App\Models\Payment;
use App\Models\PaymentLog;

class PaymentController extends Controller
{
    /**
     * Создание нового платежа
     */
    public function store(StorePaymentRequest $request)
    {
        // Получаем валидированные данные
        $validated = $request->validated();

        // Создаем платеж со статусом 'pending' (по умолчанию)
        // UUID сгенерируется автоматически в модели
        $payment = Payment::create([
            'amount' => $validated['amount'],
            'currency' => $validated['currency'],
            'status' => Payment::STATUS_PENDING,
        ]);

        // Возвращаем только payment_uuid с HTTP статусом 201 Created
        return response()->json([
            'payment_uuid' => $payment->uuid,
        ], 201);
    }

    /**
     * Получение информации о платеже по UUID
     */
    public function show(ShowPaymentRequest $request, string $uuid)
    {
        // UUID уже валидирован через ShowPaymentRequest
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
     */
    public function process(ProcessPaymentRequest $request, string $uuid)
    {
        // UUID и success уже валидированы через ProcessPaymentRequest
        // Получаем валидированные данные
        $validated = $request->validated();
        
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

        // Получаем параметр success из валидированных данных
        $success = $validated['success'];

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
