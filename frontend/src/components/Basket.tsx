"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { removeFromBasket } from "@/store/slices/basketSlice"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/utils/price"
import { ProductActions } from "./product/ProductActions"

export function Basket() {
  const basketItems = useAppSelector(state => state.basket.items)
  const total = useAppSelector(state => state.basket.total)
  const dispatch = useAppDispatch()

  const handleRemove = (productUuid: string) => {
    dispatch(removeFromBasket({ productUuid }))
  }

  const handleCreateOrder = () => {
    // Кнопка ничего не делает
  }

  if (basketItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 lg:p-12 text-center">
        <p className="text-sm lg:text-p text-gray">Ваша корзина пуста</p>
        <Link
          href="/catalog"
          className="mt-4 lg:mt-6 inline-block px-4 lg:px-6 py-2 lg:py-3 bg-blue text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm lg:text-base"
        >
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Список товаров */}
      <div className="flex-1 space-y-3 lg:space-y-4">
        {basketItems.map(item => {
          const productImage =
            item.product.images && item.product.images.length > 0
              ? item.product.images[0].card_url
              : null

          const offer = item.product.offers?.[0] ?? null
          if (!offer) return null

          const isInStock = item.product["Наличие"] === "Да в наличии"
          const unitPrice = offer.price
          const totalPrice = (parseFloat(offer.price) * item.quantity).toString()

          return (
            <div
              key={item.product.uuid}
              className="bg-white rounded-lg shadow-sm p-3 lg:p-6 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6"
            >
              {/* Верхняя часть на мобилке: изображение, описание, статус и кнопки */}
              <div className="flex gap-3 lg:contents">
                {/* Изображение товара */}
                <Link href={`/product/${item.product.slug}`} className="flex-shrink-0">
                  <div className="w-16 h-16 lg:w-24 lg:h-24 bg-lightgray bg-opacity-30 rounded-lg overflow-hidden relative">
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray text-[10px] lg:text-xs">
                        Нет фото
                      </div>
                    )}
                  </div>
                </Link>

                {/* Артикул и описание */}
                <div className="flex-1 min-w-0 lg:flex-1">
                  {item.product.article && (
                    <p className="text-[10px] lg:text-p-article text-gray mb-1">
                      Арт. {item.product.article}
                    </p>
                  )}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="text-xs lg:text-p-description text-black hover:text-blue transition-colors line-clamp-2 lg:line-clamp-3"
                  >
                    {item.product.description || item.product.name}
                  </Link>
                </div>

                {/* Статус наличия и кнопки на мобилке */}
                <div className="flex flex-col items-end gap-2 lg:hidden">
                  <div className="flex-shrink-0">
                    {isInStock ? (
                      <span className="px-2 py-0.5 bg-green bg-opacity-10 text-green text-[10px] font-medium rounded whitespace-nowrap">
                        В наличии
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-blue bg-opacity-10 text-blue text-[10px] font-medium rounded whitespace-nowrap">
                        Под заказ
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-7 h-7 flex items-center justify-center bg-lightgray bg-opacity-30 rounded-full hover:bg-opacity-50 transition-colors"
                      aria-label="Добавить в избранное"
                    >
                      <Image src="/icons/heart.png" alt="Избранное" width={14} height={13} />
                    </button>
                    <button
                      onClick={() => handleRemove(item.product.uuid)}
                      className="w-7 h-7 flex items-center justify-center bg-lightgray bg-opacity-30 rounded-full hover:bg-opacity-50 transition-colors"
                      aria-label="Удалить из корзины"
                    >
                      <Image src="/icons/trash.png" alt="Удалить" width={14} height={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Статус наличия на десктопе */}
              <div className="hidden lg:block flex-shrink-0">
                {isInStock ? (
                  <span className="px-3 py-1 bg-green bg-opacity-10 text-green text-sm font-medium rounded whitespace-nowrap">
                    В наличии
                  </span>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="px-3 py-1 bg-blue bg-opacity-10 text-blue text-sm font-medium rounded flex items-center gap-1 whitespace-nowrap">
                      Под заказ
                    </span>
                  </div>
                )}
              </div>

              {/* Нижняя часть на мобилке: качель, цена */}
              <div className="flex items-center justify-between gap-3 lg:contents">
                {/* Поле количества */}
                <div className="flex-shrink-0 lg:flex-shrink-0">
                  <ProductActions product={item.product} isInBasket={true} />
                </div>

                {/* Цена */}
                <div className="flex-shrink-0 text-right lg:text-right">
                  <p
                    className={`text-sm lg:text-p-price ${
                      isInStock ? "text-black" : "text-blue"
                    } font-bold`}
                  >
                    {formatPrice(totalPrice)} {offer.currency}
                  </p>
                  <p className="text-[10px] lg:text-xs text-gray mt-0.5 lg:mt-1 whitespace-nowrap">
                    {item.quantity} x {formatPrice(unitPrice)}
                  </p>
                </div>
              </div>

              {/* Кнопки избранного и удаления на десктопе */}
              <div className="hidden lg:flex flex-shrink-0 items-center gap-2">
                <button
                  className="w-8 h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded-full hover:bg-opacity-50 transition-colors"
                  aria-label="Добавить в избранное"
                >
                  <Image src="/icons/heart.png" alt="Избранное" width={16} height={15} />
                </button>
                <button
                  onClick={() => handleRemove(item.product.uuid)}
                  className="w-8 h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded-full hover:bg-opacity-50 transition-colors"
                  aria-label="Удалить из корзины"
                >
                  <Image src="/icons/trash.png" alt="Удалить" width={16} height={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Итого и оформление заказа */}
      <div className="lg:w-80 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 sticky top-4 lg:top-8">
          <h2 className="text-xl lg:text-h2 text-black mb-3 lg:mb-4">Итого</h2>
          <div className="flex justify-between items-center mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-lightgray">
            <span className="text-sm lg:text-p text-black">Товаров: {basketItems.length}</span>
            <span className="text-sm lg:text-p-price text-black font-bold lg:font-normal">
              {formatPrice(total.toString())} RUB
            </span>
          </div>
          <button
            onClick={handleCreateOrder}
            className="w-full py-3 lg:py-4 bg-blue text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium text-sm lg:text-base"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  )
}
