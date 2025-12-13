"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { setSearchQuery } from "@/store/slices/searchSlice"
import { debounce } from "@/utils/debounce"

export function Header() {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(state => state.search.query)
  // Локальное состояние для инпута (для отзывчивости UI)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const basketItemsCount = useAppSelector(state =>
    state.basket.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  // Создаем debounced функцию один раз через useRef
  const debouncedSetSearchQueryRef = useRef(
    debounce((query: string) => dispatch(setSearchQuery(query)), 300)
  )

  // Синхронизируем локальное состояние с Redux при изменении извне
  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value)
    debouncedSetSearchQueryRef.current(value)
  }

  return (
    <header className="bg-white max-w-container mx-2 w-[calc(100%-1rem)] lg:w-full my-5 rounded-lg">
      {/* Верхняя секция с контактами - скрыта на мобилке */}
      <div className="hidden lg:block border-lightgray">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-sm text-black">
            {/* Слева: адрес */}
            <div className="flex items-center gap-2">
              <Image src="/assets/icons/location.png" alt="Location" width={16} height={20} />
              <span>г. Екатеринбург, ул. Старых Большевиков, 2А/2</span>
            </div>

            {/* Справа: email и контакты */}
            <div className="flex items-center gap-6">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Image src="/assets/icons/email.png" alt="Email" width={20} height={20} />
                <span>info@ekapak.ru</span>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/79068139777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Image src="/assets/icons/whatsapp.png" alt="WhatsApp" width={20} height={20} />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/ekapak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Image src="/assets/icons/telegram.png" alt="Telegram" width={20} height={20} />
              </a>

              {/* Телефоны */}
              <div className="flex items-center gap-3">
                <a href="tel:+79068139777" className="hover:text-blue">
                  +7 (906) 813-97-77
                </a>
                <a href="tel:+79068136333" className="hover:text-blue">
                  +7 (906) 813-63-33
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя секция с навигацией */}
      <div className="border-lightgray">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Мобильная версия */}
          <div className="lg:hidden flex flex-col gap-3 py-3">
            {/* Верхняя строка: логотип, бургер и корзина */}
            <div className="flex items-center justify-between">
              <Link href="/catalog" className="flex items-center gap-3 flex-shrink-0">
                <Image
                  src="/assets/icons/logo.png"
                  alt="EKAPAK"
                  width={153}
                  height={19}
                  className="w-auto h-4"
                />
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/catalog"
                  className="flex items-center justify-center w-10 h-10 bg-lightgray bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-colors flex-shrink-0"
                >
                  <Image src="/assets/icons/hamburger.png" alt="Menu" width={16} height={16} />
                </Link>

                <Link
                  href="/basket"
                  className="flex items-center justify-center w-10 h-10 relative flex-shrink-0"
                >
                  <Image src="/assets/icons/basket.png" alt="Basket" width={20} height={18} />
                  {basketItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {basketItemsCount > 99 ? "99+" : basketItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Нижняя строка: поиск */}
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  placeholder="Поиск"
                  className="w-full px-4 py-2.5 pl-10 pr-4 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-sm"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Image src="/assets/icons/search.png" alt="Search" width={20} height={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Десктопная версия */}
          <div className="hidden lg:flex items-center justify-between h-20 gap-4">
            {/* Логотип слева */}
            <Link href="/catalog" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/assets/icons/logo.png"
                alt="EKAPAK"
                width={153}
                height={19}
                className="w-auto h-5"
              />
            </Link>

            {/* Кнопка Каталог */}
            <Link
              href="/catalog"
              className="flex items-center gap-2 px-4 py-2 bg-lightgray bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-colors flex-shrink-0"
            >
              <Image src="/assets/icons/hamburger.png" alt="Menu" width={16} height={16} />
              <span className="text-sm font-medium text-black">Каталог</span>
            </Link>

            {/* Поиск по центру */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  placeholder="Поиск"
                  className="w-full px-4 py-3 pl-12 pr-4 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-sm"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Image src="/assets/icons/search.png" alt="Search" width={20} height={20} />
                </div>
              </div>
            </div>

            {/* Иконки пользователя, избранного и корзины */}
            <div className="hidden lg:flex items-center gap-6 flex-shrink-0 h-20">
              {/* Профиль */}
              <button className="flex flex-col items-center justify-between h-10 hover:opacity-70 transition-opacity">
                <Image src="/assets/icons/user.png" alt="Profile" width={12} height={12} />
                <span className="text-xs text-black">Профиль</span>
              </button>

              {/* Избранное */}
              <button className="flex flex-col items-center justify-between h-10 hover:opacity-70 transition-opacity">
                <Image src="/assets/icons/heart.png" alt="Favorites" width={17} height={15} />
                <span className="text-xs text-black">Избранное</span>
              </button>

              <Link
                href="/basket"
                className="flex flex-col items-center justify-between h-10 hover:opacity-70 transition-opacity relative"
              >
                <div className="relative">
                  <Image src="/assets/icons/basket.png" alt="Basket" width={17} height={15} />
                  {basketItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {basketItemsCount > 99 ? "99+" : basketItemsCount}
                    </span>
                  )}
                </div>
                <span className="text-xs text-black">Корзина</span>
              </Link>
            </div>

            {/* Кнопка "Заказать образец" */}
            <button className="hidden lg:block px-6 py-3 bg-blue text-white rounded-lg text-sm font-medium hover:bg-lightblue transition-colors flex-shrink-0">
              Заказать образец
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
