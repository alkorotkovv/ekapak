"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { removeFromBasket, updateQuantity } from "@/store/slices/basketSlice"
import Image from "next/image"
import Link from "next/link"
import { QuantitySelector } from "@/components/QuantitySelector"
import { formatPrice } from "@/utils/price"

export function Basket() {
  const basketItems = useAppSelector(state => state.basket.items)
  const total = useAppSelector(state => state.basket.total)
  const dispatch = useAppDispatch()

  const handleRemove = (productUuid: string) => {
    dispatch(removeFromBasket({ productUuid }))
  }

  const handleQuantityChange = (productUuid: string, newQuantity: number) => {
    dispatch(updateQuantity({ productUuid, quantity: newQuantity }))
  }

  const handleCheckout = () => {
    // Кнопка ничего не делает
  }

  if (basketItems.length === 0) {
    return (
      <div className="flex flex-1 max-w-container mx-auto w-full pt-8">
        <main className="flex-1">
          <h1 className="text-h1 text-black mb-8">Корзина</h1>
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-p text-gray">Ваша корзина пуста</p>
            <Link
              href="/catalog"
              className="mt-6 inline-block px-6 py-3 bg-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-1 max-w-container mx-auto w-full pt-8">
      <main className="flex-1">
        <h1 className="text-h1 text-black mb-8">Корзина</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Список товаров */}
          <div className="flex-1 space-y-4">
            {basketItems.map(item => {
              const productImage =
                item.product.images && item.product.images.length > 0
                  ? item.product.images[0].card_url
                  : null

              const offer = item.product.offers?.[0] ?? null

              // Если оффера нет, не показываем товар (такого не должно быть, но на всякий случай)
              if (!offer) return null

              const isInStock = item.product["Наличие"] === "Да в наличии"
              const unitPrice = offer.price
              const totalPrice = (parseFloat(offer.price) * item.quantity).toString()

              return (
                <div
                  key={item.product.uuid}
                  className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-6"
                >
                  {/* Изображение товара */}
                  <Link href={`/product/${item.product.uuid}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-lightgray bg-opacity-30 rounded-lg overflow-hidden relative">
                      {productImage ? (
                        <Image
                          src={productImage}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray text-xs">
                          Нет фото
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Артикул и описание */}
                  <div className="flex-1 min-w-0">
                    {item.product.article && (
                      <p className="text-p-article text-gray mb-1">Арт. {item.product.article}</p>
                    )}
                    <Link
                      href={`/product/${item.product.uuid}`}
                      className="text-p-description text-black hover:text-blue transition-colors line-clamp-3"
                    >
                      {item.product.description || item.product.name}
                    </Link>
                  </div>

                  {/* Статус наличия */}
                  <div className="flex-shrink-0">
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

                  {/* Поле количества */}
                  <div className="flex-shrink-0">
                    <QuantitySelector
                      price={offer.price}
                      currency={offer.currency}
                      unit={offer.unit}
                      quantity={item.quantity}
                      onQuantityChange={delta =>
                        handleQuantityChange(item.product.uuid, item.quantity + delta)
                      }
                    />
                  </div>

                  {/* Цена */}
                  <div className="flex-shrink-0 text-right">
                    <p
                      className={`text-p-price ${isInStock ? "text-black" : "text-blue"} font-bold`}
                    >
                      {formatPrice(totalPrice)} {offer.currency}
                    </p>
                    <p className="text-xs text-gray mt-1 whitespace-nowrap">
                      {item.quantity} x {formatPrice(unitPrice)}
                    </p>
                  </div>

                  {/* Кнопки избранного и удаления */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded-full hover:bg-opacity-50 transition-colors"
                      aria-label="Добавить в избранное"
                    >
                      <Image src="/assets/icons/heart.png" alt="Избранное" width={16} height={15} />
                    </button>
                    <button
                      onClick={() => handleRemove(item.product.uuid)}
                      className="w-8 h-8 flex items-center justify-center bg-lightgray bg-opacity-30 rounded-full hover:bg-opacity-50 transition-colors"
                      aria-label="Удалить из корзины"
                    >
                      <Image src="/assets/icons/trash.png" alt="Удалить" width={16} height={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Итого и оформление заказа */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-h2 text-black mb-4">Итого</h2>
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-lightgray">
                <span className="text-p text-black">Товаров: {basketItems.length}</span>
                <span className="text-p-price text-black">{formatPrice(total.toString())} RUB</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-blue text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
