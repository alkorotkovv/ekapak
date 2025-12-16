"use client"

import Link from "next/link"
import Image from "next/image"
import { useAppSelector } from "@/store/hooks"

interface HeaderCartIconProps {
  variant: "mobile" | "desktop"
}

export function HeaderCartIcon({ variant }: HeaderCartIconProps) {
  const basketItemsCount = useAppSelector(state =>
    state.basket.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  if (variant === "mobile") {
    return (
      <Link href="/basket" className="flex items-center justify-center relative flex-shrink-0">
        <Image src="/icons/basket.png" alt="Basket" width={20} height={18} />
        {basketItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {basketItemsCount > 99 ? "99+" : basketItemsCount}
          </span>
        )}
      </Link>
    )
  }

  return (
    <Link
      href="/basket"
      className="flex flex-col items-center justify-between h-10 hover:opacity-70 transition-opacity relative"
    >
      <div className="relative">
        <Image src="/icons/basket.png" alt="Basket" width={17} height={15} />
        {basketItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {basketItemsCount > 99 ? "99+" : basketItemsCount}
          </span>
        )}
      </div>
      <span className="text-xs text-black">Корзина</span>
    </Link>
  )
}
