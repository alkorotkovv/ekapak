import Image from "next/image"
import type { Product } from "@/types"
import { ProductActions } from "./ProductActions"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const productName = product?.name || "Без названия"
  const productDescription = product?.description || "Описание отсутствует"
  const productImages = product?.images || []
  const isInStock = product?.["Наличие"] === "Да в наличии"
  const mainOffer = product.offers?.[0] ?? null

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Левая колонка - изображения */}
        <div className="w-full flex justify-center items-start">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {productImages.length > 0 ? (
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={productImages[0].original_url}
                  alt={productName}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
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

          {product?.article && (
            <div className="text-p-article text-gray mb-4">Артикул: {product.article}</div>
          )}

          {/* Цена и статус */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-lightgray">
            <div className="flex items-center gap-1">
              <span className="text-p-price text-black">
                {mainOffer
                  ? `${Number(mainOffer.price).toLocaleString("ru-RU", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })} ${mainOffer.currency}/${mainOffer.unit}`
                  : "Цена не указана"}
              </span>
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

          {/* Количество + добавление в корзину */}
          <div className="mt-auto">
            {mainOffer && <ProductActions product={product} isInBasket={false} />}
          </div>
        </div>
      </div>
    </div>
  )
}
