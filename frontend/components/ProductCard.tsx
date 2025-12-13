"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types"
import { useAppDispatch } from "@/store/hooks"
import { addToBasket } from "@/store/slices/basketSlice"
import { useState } from "react"
import { QuantitySelector } from "./QuantitySelector"

interface ProductCardProps {
  product: Product
  selectedCategory?: string
}

export function ProductCard({ product, selectedCategory }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState(1)

  // Получаем первый оффер
  const primaryOffer = product.offers && product.offers.length > 0 ? product.offers[0] : null

  // Получаем первое изображение
  const productImage =
    product.images && product.images.length > 0 ? product.images[0].card_url : null

  // Определяем статус наличия
  const isInStock = product["Наличие"] === "Да в наличии" ? true : false

  //Формируем строку цены
  const priceText = primaryOffer
    ? parseFloat(primaryOffer.price).toLocaleString("ru-RU", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) +
      " Р/" +
      primaryOffer.unit
    : "-"

  const handleAddToBasket = () => {
    if (primaryOffer) {
      // Добавляем указанное количество
      for (let i = 0; i < quantity; i++) {
        dispatch(addToBasket({ product, offer: primaryOffer }))
      }
      setQuantity(1) // Сбрасываем после добавления
    }
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta)
    if (primaryOffer && primaryOffer.quantity > 0) {
      setQuantity(Math.min(newQuantity, primaryOffer.quantity))
    } else {
      setQuantity(newQuantity)
    }
  }

  // Формируем URL с категорией, если она выбрана
  const productUrl = selectedCategory
    ? `/product/${product.uuid}?category=${selectedCategory}`
    : `/product/${product.uuid}`

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col hover:-translate-y-0.5">
      {/* Изображение - кликабельное */}
      <Link href={productUrl} className="block">
        <div className="w-full h-48 bg-lightgray bg-opacity-30 flex items-center justify-center overflow-hidden relative cursor-pointer">
          {productImage ? (
            <Image src={productImage} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="text-gray text-sm">Нет изображения</div>
          )}
        </div>
      </Link>

      <div className="p-[20px] flex flex-col flex-1 gap-3">
        {/* Артикул серым цветом слева */}
        {product.article && <div className="text-p-article text-gray">Арт. {product.article}</div>}
        {/* Описание - максимум 3 строки, кликабельное */}
        <Link href={productUrl} className="block">
          {product.description && (
            <p className="text-p-description text-black line-clamp-3 cursor-pointer hover:text-blue transition-colors">
              {product.description} : Описание отсутствует
            </p>
          )}
        </Link>

        {/* Цена и статус в одной строке */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-p-price">{priceText}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            <span className={`text-p-description ${isInStock ? "text-green" : "text-blue"}`}>
              {isInStock ? "В наличии" : "Под заказ"}
            </span>
          </div>
        </div>

        {/* Качель с плюсом/минусом и кнопка добавить в корзину */}
        {primaryOffer && (
          <>
            <QuantitySelector
              offer={primaryOffer}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              disabled={false}
            />
            <button
              onClick={handleAddToBasket}
              className="w-full px-4 py-3 bg-blue text-white rounded-lg text-sm font-medium transition-colors hover:bg-lightblue disabled:bg-lightgray disabled:cursor-not-allowed"
            >
              Добавить в корзину
            </button>
          </>
        )}
      </div>
    </div>
  )
}
