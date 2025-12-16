import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addToBasket, updateQuantity } from "@/store/slices/basketSlice"
import { Product } from "@/types"

interface UseProductOptions {
  product: Product | null
  isInBasket?: boolean // Товар уже в корзине (определяет показывать ли кнопку и обновлять ли корзину)
}

// hook для взаимодействия с товаром
export function useProduct({ product, isInBasket = false }: UseProductOptions) {
  const dispatch = useAppDispatch()
  const basketItems = useAppSelector(state => state.basket.items)

  // Если товар в корзине, берем количество оттуда, иначе начинаем с 1
  const existingItem = basketItems.find(item => item.product.uuid === product?.uuid)
  const initialQuantity = isInBasket && existingItem ? existingItem.quantity : 1

  const [quantity, setQuantity] = useState(initialQuantity)

  // Синхронизируем количество с корзиной, если товар уже там есть
  useEffect(() => {
    if (isInBasket && existingItem) {
      setQuantity(existingItem.quantity)
    }
  }, [isInBasket, existingItem])

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
    let finalQuantity = newQuantity

    if (offer && offer.quantity > 0) {
      finalQuantity = Math.min(newQuantity, offer.quantity)
    }

    setQuantity(finalQuantity)

    // Обновляем корзину только если товар уже там есть
    if (isInBasket && product) {
      dispatch(updateQuantity({ productUuid: product.uuid, quantity: finalQuantity }))
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
