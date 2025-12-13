"use client"

import { formatPrice } from "@/utils/price"

interface QuantitySelectorProps {
  price: string
  currency: string
  unit: string
  quantity: number
  onQuantityChange: (delta: number) => void
  disabled?: boolean
}

export function QuantitySelector({
  price,
  currency,
  unit,
  quantity,
  onQuantityChange,
  disabled = false,
}: QuantitySelectorProps) {
  const totalPrice = formatPrice((parseFloat(price) * quantity).toString())

  return (
    <div className="flex items-center gap-1 lg:gap-2 p-1.5 lg:p-3 border border-lightgray rounded-lg bg-white">
      {/* Кнопка минус слева */}
      <button
        onClick={() => onQuantityChange(-1)}
        disabled={quantity <= 1 || disabled}
        className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded hover:bg-opacity-50 disabled:bg-opacity-20 disabled:text-gray disabled:cursor-not-allowed transition-colors flex-shrink-0"
        aria-label="Уменьшить количество"
      >
        <span className="text-black text-sm lg:text-lg leading-none">−</span>
      </button>

      {/* Информация по центру в две строки */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0">
        <div className="text-xs lg:text-base font-medium text-black truncate w-full text-center">
          {quantity} {unit.toUpperCase()}
        </div>
        <div className="text-[10px] lg:text-xs text-gray truncate w-full text-center">
          на {totalPrice} {currency}
        </div>
      </div>

      {/* Кнопка плюс справа */}
      <button
        onClick={() => onQuantityChange(1)}
        disabled={disabled}
        className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded hover:bg-opacity-50 disabled:bg-opacity-20 disabled:text-gray disabled:cursor-not-allowed transition-colors flex-shrink-0"
        aria-label="Увеличить количество"
      >
        <span className="text-black text-sm lg:text-lg leading-none">+</span>
      </button>
    </div>
  )
}
