"use client"

import { useProduct } from "@/hooks/useProducts"
import { useSearchParams } from "next/navigation"
import { QuantitySelector } from "@/components/QuantitySelector"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Carousel } from "antd"
import Image from "next/image"
import { useProductQuantity } from "@/hooks/useProductQuantity"

interface ProductProps {
  uuid: string
}

export function Product({ uuid }: ProductProps) {
  const { data, isLoading, error } = useProduct(uuid)
  const searchParams = useSearchParams()

  const { quantity, offer, priceText, handleAddToBasket, handleQuantityChange } =
    useProductQuantity({ product: data ?? null })

  const categoryFromUrl = searchParams?.get("category") || undefined

  // Определяем статус наличия
  const isInStock = data?.["Наличие"] === "Да в наличии" ? true : false

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
    return (
      <div className="flex flex-1 max-w-container mx-auto w-full pt-8">
        <main className="flex-1">
          <div className="py-8 text-center text-p text-gray">Товар не найден</div>
        </main>
      </div>
    )
  }

  // Принудительно рендерим, даже если что-то не так
  const productName = data?.name || "Без названия"
  const productDescription = data?.description || "Описание отсутствует"
  const productImages = data?.images || []

  return (
    <div className="flex flex-1 max-w-container mx-auto w-full pt-4 lg:pt-8 px-2 lg:px-0">
      <main className="flex-1 w-full">
        <Breadcrumbs categoryUuid={categoryFromUrl || data?.category_uuid} />
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Левая колонка - изображения */}
            <div className="w-full flex justify-center items-start">
              <div className="w-full max-w-md mx-auto lg:mx-0">
                {productImages.length > 0 ? (
                  <Carousel autoplay dots arrows className="product-carousel">
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
                      <p className="text-p">Нет изображения</p>
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
              {offer && (
                <div className="mt-auto">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
