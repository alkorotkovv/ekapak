"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useProducts } from "@/hooks/useProducts"
import { Products } from "@/components/Products"
import { Categories } from "@/components/Categories"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Pagination } from "antd"
import { useAppSelector } from "@/store/hooks"

const ITEMS_PER_PAGE = 8

export function Catalog() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Получаем категорию из URL и поисковый запрос из Redux
  const selectedCategory = searchParams?.get("category") || undefined
  const searchQuery = useAppSelector(state => state.search.query)
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useProducts(selectedCategory)

  // Сбрасываем страницу при смене категории или поискового запроса
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  const handleCategorySelect = (categoryUuid: string | undefined) => {
    setCurrentPage(1)

    // Обновляем URL - React Query автоматически сделает новый запрос при изменении queryKey
    const params = new URLSearchParams(searchParams?.toString() || "")
    if (categoryUuid) {
      params.set("category", categoryUuid)
    } else {
      params.delete("category")
    }
    const newUrl = params.toString() ? `/catalog?${params.toString()}` : "/catalog"
    router.push(newUrl, { scroll: false })
  }

  // Фильтруем товары по поисковому запросу (по названию без учета регистра)
  const filteredProducts = useMemo(() => {
    if (!data || !data.length) return []

    if (!searchQuery.trim()) return data

    const normalizedQuery = searchQuery.toLowerCase().trim()
    return data.filter(product => {
      const name = product.name?.toLowerCase() || ""
      return name.includes(normalizedQuery)
    })
  }, [data, searchQuery])

  // Вычисляем товары для текущей страницы
  const paginatedProducts = useMemo(() => {
    if (!filteredProducts.length) return []

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage])

  return (
    <div className="flex flex-1 flex-col max-w-container mx-auto w-full">
      {/* Хлебные крошки над всем каталогом */}
      <Breadcrumbs categoryUuid={selectedCategory} />

      <div className="flex flex-1 gap-8 lg:flex-row flex-col">
        {/* Категории: на мобилке показываем только если категория не выбрана */}
        <div
          className={`max-w-categories flex-shrink-0 lg:max-w-categories w-full ${
            selectedCategory ? "hidden lg:block" : "block"
          }`}
        >
          <Categories selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
        </div>

        {/* Товары: на мобилке показываем только если категория выбрана */}
        <main className={`flex-1 min-w-0 ${selectedCategory ? "block" : "hidden lg:block"}`}>
          {isLoading && <div className="py-8 text-center text-p text-gray">Загрузка...</div>}

          {error && (
            <div className="py-8 text-center text-p text-red-600">Ошибка загрузки данных</div>
          )}

          {!isLoading && !error && data && data.length === 0 && (
            <div className="py-12 text-center text-p text-gray">Товары не найдены</div>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <>
              <Products products={paginatedProducts} selectedCategory={selectedCategory} />
              <div className="my-8 flex flex-col items-center gap-4">
                <Pagination
                  current={currentPage}
                  total={filteredProducts.length}
                  pageSize={ITEMS_PER_PAGE}
                  onChange={page => setCurrentPage(page)}
                  showSizeChanger={false}
                  showTotal={(total, range) =>
                    `Показано ${range[0]}-${range[1]} из ${total} товаров`
                  }
                />
              </div>
            </>
          )}

          {!isLoading && !error && filteredProducts.length === 0 && data && data.length > 0 && (
            <div className="py-12 text-center text-p text-gray">
              {searchQuery ? "Товары по запросу не найдены" : "Товары не найдены"}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
