"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useProducts } from "@/hooks/useProducts"
import { Products } from "@/components/Products"
import { Categories } from "@/components/Categories"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Pagination } from "antd"

const ITEMS_PER_PAGE = 8

export function Catalog() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Получаем категорию только из URL - это единственный источник истины
  const selectedCategory = searchParams?.get("category") || undefined
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useProducts(selectedCategory)

  // Сбрасываем страницу при смене категории
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

  // Вычисляем товары для текущей страницы
  const paginatedProducts = useMemo(() => {
    if (!data || !data.length) return []

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return data.slice(startIndex, endIndex)
  }, [data, currentPage])

  return (
    <div className="flex flex-1 flex-col max-w-container mx-auto w-full">
      {/* Хлебные крошки над всем каталогом */}
      <Breadcrumbs categoryUuid={selectedCategory} />

      <div className="flex flex-1 gap-8 lg:flex-row flex-col">
        {/* Категории: на мобилке показываем только если категория не выбрана */}
        <div
          className={`w-category-sidebar flex-shrink-0 lg:w-category-sidebar w-full ${
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

          {!isLoading && !error && data && data.length > 0 && (
            <>
              <Products products={paginatedProducts} selectedCategory={selectedCategory} />
              <div className="my-8 flex flex-col items-center gap-4">
                <Pagination
                  current={currentPage}
                  total={data.length}
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
        </main>
      </div>
    </div>
  )
}
