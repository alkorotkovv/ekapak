<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    /**
     * Первичный ключ не является автоинкрементом
     */
    public $incrementing = false;

    /**
     * Тип первичного ключа
     */
    protected $keyType = 'string';

    /**
     * Первичный ключ
     */
    protected $primaryKey = 'uuid';

    /**
     * Поля, которые можно массово заполнять
     */
    protected $fillable = [
        'uuid',
        'amount',
        'currency',
        'status',
    ];

    /**
     * Значения по умолчанию для атрибутов
     */
    protected $attributes = [
        'status' => 'pending',
    ];

    /**
     * Касты типов для атрибутов
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot метод для автогенерации UUID при создании
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($payment) {
            if (empty($payment->uuid)) {
                $payment->uuid = (string) Str::uuid();
            }
        });
    }

    /**
     * Константы для статусов
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_SUCCESS = 'success';
    public const STATUS_FAILED = 'failed';

    /**
     * Константы для валют
     */
    public const CURRENCY_RUB = 'RUB';
    public const CURRENCY_EUR = 'EUR';
    public const CURRENCY_USD = 'USD';
}
