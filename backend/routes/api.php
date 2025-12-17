<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// API маршруты для платежей
Route::post('/payments', [PaymentController::class, 'store']);
Route::get('/payments/{uuid}', [PaymentController::class, 'show']);
Route::post('/payments/{uuid}/process', [PaymentController::class, 'process']);

