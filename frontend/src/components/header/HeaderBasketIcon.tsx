"use client"

import Link from "next/link"
import Image from "next/image"
import { useAppSelector } from "@/store/hooks"

export function HeaderBasketIcon() {
  const basketItemsCount = useAppSelector(state =>
    state.basket.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return (
    <Link
      href="/basket"
      className="flex items-center justify-center relative hover:opacity-70 transition-opacity lg:flex-col lg:justify-between lg:h-10"
    >
      <div className="relative">
        {/* Мобильная версия: иконка 20x20 */}
        <Image src="/icons/basket.png" alt="Basket" width={20} height={20} className="lg:hidden" />
        {/* Десктопная версия: маленькая иконка */}
        <Image
          src="/icons/basket.png"
          alt="Basket"
          width={17}
          height={15}
          className="hidden lg:block"
        />
        {basketItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {basketItemsCount > 99 ? "99+" : basketItemsCount}
          </span>
        )}
      </div>
      {/* Текст "Корзина" только на десктопе */}
      <span className="hidden lg:block text-xs text-black">Корзина</span>
    </Link>
  )
}
