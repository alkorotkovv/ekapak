"use client"

import { useProduct } from "@/hooks/useProducts"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/slices/cartSlice"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { QuantitySelector } from "@/components/QuantitySelector"
import { Carousel } from "antd"
import Image from "next/image"

interface ProductProps {
  uuid: string
}

export function Product({ uuid }: ProductProps) {
  const { data, isLoading, error } = useProduct(uuid)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [quantity, setQuantity] = useState(1)

  // Получаем категорию из URL - это правильный способ сохранять состояние в Next.js
  // Категория передается через URL параметр при клике на товар из каталога
  const categoryFromUrl = searchParams?.get("category") || undefined

  // Функция для возврата на каталог с сохранением категории
  // Если категория есть в URL - возвращаемся на каталог с этой категорией
  // Если нет - просто возвращаемся назад (router.back()) или на каталог без фильтра
  const handleBack = () => {
    if (categoryFromUrl) {
      // Если категория есть в URL - возвращаемся на каталог с сохранением категории
      router.push(`/catalog?category=${categoryFromUrl}`)
    } else {
      // Если категории нет - пытаемся вернуться назад, иначе на каталог
      // router.back() вернет на предыдущую страницу (каталог, если оттуда пришли)
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back()
      } else {
        router.push("/catalog")
      }
    }
  }

  // Получаем первый оффер
  const primaryOffer = data?.offers && data.offers.length > 0 ? data.offers[0] : null

  // Определяем статус наличия
  const isInStock = data?.["Наличие"] === "Да в наличии" ? true : false

  const handleAddToCart = () => {
    if (primaryOffer && data) {
      // Добавляем указанное количество
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({ product: data, offer: primaryOffer }))
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

  const priceText = primaryOffer
    ? parseFloat(primaryOffer.price).toLocaleString("ru-RU", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) +
      " Р/" +
      primaryOffer.unit
    : "Цена не указана"

  console.log("Product component state:", { data, isLoading, error, uuid })

  if (isLoading) {
    return (
      <div className="flex flex-1 max-w-container mx-auto w-full pt-8">
        <main className="flex-1">
          <div className="py-8 text-center text-p text-gray">Загрузка...</div>
        </main>
      </div>
    )
  }

  if (error) {
    console.error("Product error:", error)
    return (
      <div className="flex flex-1 max-w-container mx-auto w-full pt-8">
        <main className="flex-1">
          <div className="py-8 text-center text-p text-red-600">
            Ошибка загрузки товара: {error instanceof Error ? error.message : "Unknown error"}
          </div>
        </main>
      </div>
    )
  }

  if (!data) {
    console.warn("Product data is null or undefined")
    return (
      <div className="flex flex-1 max-w-container mx-auto w-full pt-8">
        <main className="flex-1">
          <div className="py-8 text-center text-p text-gray">Товар не найден</div>
        </main>
      </div>
    )
  }

  console.log("Rendering product with data:", data.name, data.description)

  // Принудительно рендерим, даже если что-то не так
  const productName = data?.name || "Без названия"
  const productDescription = data?.description || "Описание отсутствует"
  const productImages = data?.images || []

  return (
    <div className="flex flex-1 max-w-container mx-auto w-full pt-8">
      <main className="flex-1 w-full">
        {/* Кнопка "Назад" */}
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-p text-black hover:text-blue transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Назад</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Левая колонка - изображения */}
            <div className="w-full flex justify-center items-start">
              <div className="w-full max-w-md mx-auto lg:mx-0">
                {productImages.length > 0 ? (
                  <Carousel autoplay dots arrows className="product-carousel" dotPosition="bottom">
                    {productImages.map((image, index) => (
                      <div key={index} className="relative w-full h-64 md:h-80">
                        <Image
                          src={image.original_url}
                          alt={`${productName} - изображение ${index + 1}`}
                          fill
                          className="object-contain rounded-lg"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="w-full h-64 md:h-80 bg-lightgray bg-opacity-30 rounded-lg flex items-center justify-center">
                    <div className="text-gray text-center">
                      <p className="text-p mb-2">Нет изображения</p>
                      <p className="text-p-description">Изображение товара отсутствует</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Правая колонка - информация о товаре */}
            <div className="flex flex-col">
              <h1 className="text-h2 text-black mb-4">{productName}</h1>

              {data?.article && (
                <div className="text-p-article text-gray mb-4">Артикул: {data.article}</div>
              )}

              {/* Цена и статус */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-lightgray">
                <div className="flex items-center gap-1">
                  <span className="text-p-price text-black">{priceText}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-p-description ${isInStock ? "text-green" : "text-blue"}`}>
                    {isInStock ? "В наличии" : "Под заказ"}
                  </span>
                </div>
              </div>

              {/* Описание */}
              <div className="mb-6 flex-1">
                <h2 className="text-h3 text-black mb-3">Описание</h2>
                <p className="text-p-description text-black whitespace-pre-line leading-relaxed">
                  {productDescription}
                </p>
              </div>

              {/* Качелька и кнопка добавить в корзину */}
              {primaryOffer && (
                <div className="mt-auto">
                  <QuantitySelector
                    offer={primaryOffer}
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    onAddToCart={handleAddToCart}
                    disabled={!primaryOffer || !primaryOffer.quantity}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
