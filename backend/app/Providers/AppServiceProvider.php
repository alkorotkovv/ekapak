<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Rate limiter для создания платежей (POST /api/payments)
        // 10 запросов в минуту - создание платежей более критично
        RateLimiter::for('payments.create', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip());
        });

        // Rate limiter для получения информации о платеже (GET /api/payments/{uuid})
        // 100 запросов в минуту - чтение менее нагружает систему
        RateLimiter::for('payments.show', function (Request $request) {
            return Limit::perMinute(100)->by($request->ip());
        });

        // Rate limiter для обработки платежа (POST /api/payments/{uuid}/process)
        // 30 запросов в минуту - обработка требует больше ресурсов
        RateLimiter::for('payments.process', function (Request $request) {
            return Limit::perMinute(30)->by($request->ip());
        });
    }
}
