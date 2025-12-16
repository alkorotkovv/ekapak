import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"
import { ProductActions } from "./ProductActions"

interface ProductCardProps {
  product: Product
  selectedCategory?: string
}

export function ProductCard({ product, selectedCategory }: ProductCardProps) {
  const productImage = product.images?.[0]?.card_url ?? null
  const isInStock = product["Наличие"] === "Да в наличии"
  const mainOffer = product.offers?.[0] ?? null

  const priceText = mainOffer
    ? `${Number(mainOffer.price).toLocaleString("ru-RU", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })} ${mainOffer.currency}/${mainOffer.unit}`
    : "Цена не указана"

  const productUrl = selectedCategory
    ? `/product/${product.slug}?category=${selectedCategory}`
    : `/product/${product.slug}`

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
      <Link href={productUrl} className="block">
        <div className="w-full h-32 lg:h-48 bg-lightgray bg-opacity-30 flex items-center justify-center overflow-hidden relative cursor-pointer">
          {productImage ? (
            <Image src={productImage} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="text-gray text-xs lg:text-sm">Нет изображения</div>
          )}
        </div>
      </Link>

      <div className="p-2 lg:p-[20px] flex flex-col flex-1 gap-1.5 lg:gap-3">
        {product.article && (
          <div className="text-[10px] lg:text-p-article text-gray">Арт. {product.article}</div>
        )}

        <Link href={productUrl} className="block">
          {product.description && (
            <p className="text-xs lg:text-p-description text-black line-clamp-2 lg:line-clamp-3 cursor-pointer hover:text-blue transition-colors">
              {product.description}
            </p>
          )}
        </Link>

        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs lg:text-p-price truncate">{priceText}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] lg:text-sm font-medium flex-shrink-0">
            <span className={`lg:text-p-description ${isInStock ? "text-green" : "text-blue"}`}>
              {isInStock ? "В наличии" : "Под заказ"}
            </span>
          </div>
        </div>

        {/* Качель с плюсом/минусом и кнопка добавить в корзину */}
        {mainOffer && <ProductActions product={product} isInBasket={false} />}
      </div>
    </div>
  )
}
