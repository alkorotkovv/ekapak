<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
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
    })->create();
