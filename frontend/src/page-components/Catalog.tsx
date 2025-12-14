"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useProducts } from "@/hooks/useProducts"
import { Products } from "@/components/Products"
import { Categories } from "@/components/Categories"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Pagination } from "antd"
import { useAppSelector } from "@/store/hooks"

const ITEMS_PER_PAGE = 8

interface CatalogProps {
  categoryUuid?: string
}

export function Catalog({ categoryUuid }: CatalogProps = {}) {
  const searchParams = useSearchParams()

  // Получаем поисковый запрос из Redux
  const searchQuery = useAppSelector(state => state.search.query)
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useProducts(categoryUuid)

  // Сбрасываем страницу при смене категории или поискового запроса
  useEffect(() => {
    setCurrentPage(1)
  }, [categoryUuid, searchQuery])

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
      <Breadcrumbs categoryUuid={categoryUuid} />

      <div className="flex flex-1 gap-8 lg:flex-row flex-col">
        {/* Категории: на мобилке показываем только если категория не выбрана */}
        <div
          className={`w-full lg:w-full lg:max-w-categories flex-shrink-0 ${
            categoryUuid ? "hidden lg:block" : "block"
          }`}
        >
          <Categories selectedCategory={categoryUuid} />
        </div>

        {/* Товары: на мобилке показываем только если категория выбрана */}
        <main className={`flex-1 min-w-0 ${categoryUuid ? "block" : "hidden lg:block"}`}>
          {isLoading && <div className="py-8 text-center text-p text-gray">Загрузка...</div>}

          {error && (
            <div className="py-8 text-center text-p text-red-600">Ошибка загрузки данных</div>
          )}

          {!isLoading && !error && data && data.length === 0 && (
            <div className="py-12 text-center text-p text-gray">Товары не найдены</div>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <>
              <Products products={paginatedProducts} />
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
