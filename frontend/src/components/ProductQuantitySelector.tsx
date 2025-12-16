"use client"

import { QuantitySelector } from "@/components/QuantitySelector"
import { useProduct } from "@/hooks/useProduct"
import type { Product as ProductType } from "@/types"

interface ProductQuantitySelectorProps {
  product: ProductType
}

// Клиентский виджет для страницы товара:
// инкапсулирует всю логику количества и добавления в корзину
export function ProductQuantitySelector({ product }: ProductQuantitySelectorProps) {
  const { quantity, offer, handleAddToBasket, handleQuantityChange } = useProduct({
    product,
  })

  if (!offer) return null

  return (
    <>
      <QuantitySelector
        price={offer.price}
        currency={offer.currency}
        unit={offer.unit}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        disabled={!offer || !offer.quantity}
      />
      <button
        onClick={handleAddToBasket}
        disabled={!offer || !offer.quantity}
        className="w-full px-4 py-3 bg-blue text-white rounded-lg text-sm font-medium transition-colors hover:bg-lightblue disabled:bg-lightgray disabled:cursor-not-allowed mt-2"
      >
        Добавить в корзину
      </button>
    </>
  )
}
