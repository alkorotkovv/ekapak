<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentLog extends Model
{
    /**
     * Поля, которые можно массово заполнять
     */
    protected $fillable = [
        'payment_uuid',
        'action',
        'timestamp',
    ];

    /**
     * Отключаем автоматическое управление timestamps
     */
    public $timestamps = false;

    /**
     * Касты типов для атрибутов
     */
    protected $casts = [
        'timestamp' => 'datetime',
    ];

    /**
     * Константы для действий
     */
    public const ACTION_PROCESSED_SUCCESS = 'processed_success';
    public const ACTION_PROCESSED_FAILED = 'processed_failed';
}
