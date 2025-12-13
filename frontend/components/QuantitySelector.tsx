"use client"

import { Offer } from "@/types"

interface QuantitySelectorProps {
  offer: Offer
  quantity: number
  onQuantityChange: (delta: number) => void
  disabled?: boolean
}

export function QuantitySelector({
  offer,
  quantity,
  onQuantityChange,
  disabled = false,
}: QuantitySelectorProps) {
  const totalPrice = (parseFloat(offer.price) * quantity).toFixed(2)

  return (
    <div className="flex items-center gap-2 p-3 border border-lightgray rounded-lg bg-white">
      {/* Кнопка минус слева */}
      <button
        onClick={() => onQuantityChange(-1)}
        disabled={quantity <= 1 || disabled}
        className="w-8 h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded hover:bg-opacity-50 disabled:bg-opacity-20 disabled:text-gray disabled:cursor-not-allowed transition-colors"
        aria-label="Уменьшить количество"
      >
        <span className="text-black text-lg leading-none">−</span>
      </button>

      {/* Информация по центру в две строки */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-base font-medium text-black">
          {quantity} {offer.unit.toUpperCase()}
        </div>
        <div className="text-xs text-gray">
          на {totalPrice} {offer.currency}
        </div>
      </div>

      {/* Кнопка плюс справа */}
      <button
        onClick={() => onQuantityChange(1)}
        disabled={disabled}
        className="w-8 h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded hover:bg-opacity-50 disabled:bg-opacity-20 disabled:text-gray disabled:cursor-not-allowed transition-colors"
        aria-label="Увеличить количество"
      >
        <span className="text-black text-lg leading-none">+</span>
      </button>
    </div>
  )
}
