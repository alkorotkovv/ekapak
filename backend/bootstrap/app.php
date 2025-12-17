<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Rate limiting применяется индивидуально к каждому роуту
        // через middleware в routes/api.php
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Для API-роутов всегда возвращаем JSON при ошибках валидации
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, \Illuminate\Http\Request $request) {
            if ($request->is('api/*')) {
                // Берем первое сообщение об ошибке из валидации
                $errors = $e->errors();
                $firstError = !empty($errors) ? reset($errors)[0] : 'Ошибка валидации';
                
                return response()->json([
                    'message' => $firstError,
                ], 422);
            }
        });

        // Для API-роутов возвращаем JSON при превышении rate limit
        $exceptions->render(function (\Illuminate\Http\Exceptions\ThrottleRequestsException $e, \Illuminate\Http\Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Превышен лимит запросов. Попробуйте позже.',
                ], 429);
            }
        });
    })->create();
