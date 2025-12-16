"use client"

import { useProduct } from "@/hooks/useProduct"
import type { Product } from "@/types"
import { formatPrice } from "@/utils/price"

interface ProductActionsProps {
  product: Product
  isInBasket?: boolean // Товар уже в корзине (определяет показывать ли кнопку и для хука)
}

// Компонент объединяет качель количества и кнопку добавления в корзину
// с единым состоянием quantity для синхронизации
export function ProductActions({ product, isInBasket = false }: ProductActionsProps) {
  const { quantity, offer, handleAddToBasket, handleQuantityChange } = useProduct({
    product,
    isInBasket,
  })

  if (!offer) return null

  const totalPrice = formatPrice((parseFloat(offer.price) * quantity).toString())

  return (
    <>
      {/* Качель количества */}
      <div className="flex items-center gap-1 lg:gap-2 p-1.5 lg:p-3 border border-lightgray rounded-lg bg-white">
        {/* Кнопка минус слева */}
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1 || !offer || !offer.quantity}
          className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded hover:bg-opacity-50 disabled:bg-opacity-20 disabled:text-gray disabled:cursor-not-allowed transition-colors flex-shrink-0"
          aria-label="Уменьшить количество"
        >
          <span className="text-black text-sm lg:text-lg leading-none">−</span>
        </button>

        {/* Информация по центру в две строки */}
        <div className="flex-1 flex flex-col items-center justify-center min-w-0">
          <div className="text-xs lg:text-base font-medium text-black truncate w-full text-center">
            {quantity} {offer.unit.toUpperCase()}
          </div>
          <div className="text-[10px] lg:text-xs text-gray truncate w-full text-center">
            на {totalPrice} {offer.currency}
          </div>
        </div>

        {/* Кнопка плюс справа */}
        <button
          onClick={() => handleQuantityChange(1)}
          disabled={!offer || !offer.quantity}
          className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded hover:bg-opacity-50 disabled:bg-opacity-20 disabled:text-gray disabled:cursor-not-allowed transition-colors flex-shrink-0"
          aria-label="Увеличить количество"
        >
          <span className="text-black text-sm lg:text-lg leading-none">+</span>
        </button>
      </div>

      {/* Кнопка добавления в корзину (показывается только если товар не в корзине) */}
      {!isInBasket && (
        <button
          onClick={handleAddToBasket}
          disabled={!offer || !offer.quantity}
          className="w-full px-2 lg:px-4 py-1.5 lg:py-3 bg-blue text-white rounded-lg text-[10px] lg:text-sm font-medium transition-colors hover:bg-lightblue disabled:bg-lightgray disabled:cursor-not-allowed"
        >
          В корзину
        </button>
      )}
    </>
  )
}
