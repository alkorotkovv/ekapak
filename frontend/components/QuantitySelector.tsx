"use client"

import { Offer } from "@/types"

interface QuantitySelectorProps {
  offer: Offer
  quantity: number
  onQuantityChange: (delta: number) => void
  onAddToCart: () => void
  disabled?: boolean
  showAddButton?: boolean
}

export function QuantitySelector({
  offer,
  quantity,
  onQuantityChange,
  onAddToCart,
  disabled = false,
  showAddButton = true,
}: QuantitySelectorProps) {
  const totalPrice = (parseFloat(offer.price) * quantity).toFixed(2)

  return (
    <>
      {/* Качель с плюсом/минусом и информация о сумме */}
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

      {/* Кнопка добавить в корзину */}
      {showAddButton && (
        <button
          onClick={onAddToCart}
          className="w-full px-4 py-3 bg-blue text-white rounded-lg text-sm font-medium transition-colors hover:bg-lightblue disabled:bg-lightgray disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Добавить в корзину
        </button>
      )}
    </>
  )
}
