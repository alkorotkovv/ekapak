<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// API маршруты для платежей
Route::post('/payments', [PaymentController::class, 'store'])
    ->middleware('throttle:payments.create');

Route::get('/payments/{uuid}', [PaymentController::class, 'show'])
    ->middleware('throttle:payments.show');

Route::post('/payments/{uuid}/process', [PaymentController::class, 'process'])
    ->middleware('throttle:payments.process');

