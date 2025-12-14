import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { addToBasket } from "@/store/slices/basketSlice"
import { Product } from "@/types"

interface UseProductOptions {
  product: Product | null
}

// hook для взаимодействия с товаром
export function useProduct({ product }: UseProductOptions) {
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState(1)

  // Получаем первый оффер
  const offer = product?.offers?.[0] ?? null

  // Формируем строку цены
  const priceText = offer
    ? parseFloat(offer.price).toLocaleString("ru-RU", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) +
      " " +
      offer.currency +
      "/" +
      offer.unit
    : "-"

  const handleAddToBasket = () => {
    if (offer && product) {
      dispatch(addToBasket({ product, quantity }))
      setQuantity(1) // Сбрасываем после добавления
    }
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta)
    if (offer && offer.quantity > 0) {
      setQuantity(Math.min(newQuantity, offer.quantity))
    } else {
      setQuantity(newQuantity)
    }
  }

  return {
    quantity,
    offer,
    priceText,
    category_uuid: product?.category_uuid,
    handleAddToBasket,
    handleQuantityChange,
  }
}

