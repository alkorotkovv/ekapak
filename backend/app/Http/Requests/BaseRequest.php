<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class BaseRequest extends FormRequest
{
    /**
     * Для API без аутентификации всегда разрешаем доступ
     */
    public function authorize(): bool
    {
        return true;
    }
}

