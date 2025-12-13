"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Поиск:", searchQuery)
  }

  return (
    <header className="bg-white max-w-container mx-auto w-full my-5 rounded-lg">
      {/* Верхняя секция с контактами */}
      <div className="border-lightgray">
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
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Логотип слева */}
            <Link href="/catalog" className="flex items-center gap-3 flex-shrink-0">
              <Image src="/assets/icons/logo.png" alt="EKAPAK" width={153} height={19} />
            </Link>

            {/* Кнопка Каталог */}
            <Link
              href="/catalog"
              className="flex items-center gap-2 px-4 py-2 bg-lightgray bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-colors"
            >
              <Image src="/assets/icons/hamburger.png" alt="Menu" width={16} height={16} />
              <span className="text-sm font-medium text-black">Каталог</span>
            </Link>

            {/* Поиск по центру */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Поиск"
                  className="w-full px-4 py-3 pl-12 pr-4 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-sm"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Image src="/assets/icons/search.png" alt="Search" width={20} height={20} />
                </div>
              </div>
            </form>

            {/* Иконки пользователя, избранного и корзины */}
            <div className="flex items-center gap-6 flex-shrink-0 h-20">
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
                className="flex flex-col items-center justify-between h-10 hover:opacity-70 transition-opacity"
              >
                <Image src="/assets/icons/cart.png" alt="Cart" width={17} height={15} />
                <span className="text-xs text-black">Корзина</span>
              </Link>

              {/* Корзина */}
              {/* <div className="flex flex-col items-center gap-1">
                <MiniCart />
              </div> */}
            </div>

            {/* Кнопка "Заказать образец" */}
            <button className="px-6 py-3 bg-blue text-white rounded-lg text-sm font-medium hover:bg-lightblue transition-colors flex-shrink-0">
              Заказать образец
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
