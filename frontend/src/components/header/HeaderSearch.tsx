"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"
import { debounce } from "@/utils/debounce"

interface HeaderSearchProps {
  variant: "mobile" | "desktop"
}

export function HeaderSearch({ variant }: HeaderSearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Получаем поисковый запрос из URL
  const urlSearchQuery = searchParams.get("search") || ""
  const [localSearchQuery, setLocalSearchQuery] = useState(urlSearchQuery)

  // Синхронизируем локальное состояние с URL при изменении
  useEffect(() => {
    setLocalSearchQuery(urlSearchQuery)
  }, [urlSearchQuery])

  const debouncedUpdateUrlRef = useRef(
    debounce((query: string) => {
      // Обновляем URL напрямую
      const params = new URLSearchParams(searchParams.toString())
      if (query.trim()) {
        params.set("search", query.trim())
        // Сбрасываем страницу при поиске
        params.delete("page")
      } else {
        params.delete("search")
      }

      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.push(newUrl)
    }, 300)
  )

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value)
    debouncedUpdateUrlRef.current(value)
  }

  const wrapperClassName = variant === "mobile" ? "w-full" : "flex-1 max-w-2xl"
  const inputClassName =
    variant === "mobile"
      ? "w-full px-4 py-2.5 pl-10 pr-4 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-sm"
      : "w-full px-4 py-3 pl-12 pr-4 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-sm"
  const iconWrapperClassName =
    variant === "mobile"
      ? "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      : "absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"

  return (
    <div className={wrapperClassName}>
      <div className="relative">
        <input
          type="text"
          value={localSearchQuery}
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="Поиск"
          className={inputClassName}
        />
        <div className={iconWrapperClassName}>
          <Image src="/icons/search.png" alt="Search" width={20} height={20} />
        </div>
      </div>
    </div>
  )
}
