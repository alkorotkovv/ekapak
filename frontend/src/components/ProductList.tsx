"use client"

import { useState, useMemo, useEffect } from "react"
import { Products } from "@/components/Products"
import { Pagination } from "antd"
import { useAppSelector } from "@/store/hooks"
import { Product } from "@/types"

const ITEMS_PER_PAGE = 8

interface ProductListProps {
  products?: Product[]
  selectedCategorySlug?: string
}

// Клиентский виджет для каталога:
// получает список товаров с сервера и отвечает только за поиск и пагинацию.
// Хлебные крошки и список категорий рендерятся на сервере в page.tsx.
export function ProductList({ products, selectedCategorySlug }: ProductListProps = {}) {
  const searchQuery = useAppSelector(state => state.search.query)
  const [currentPage, setCurrentPage] = useState(1)

  // Сбрасываем страницу при смене категории или поискового запроса
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategorySlug, searchQuery])

  // Фильтруем товары по поисковому запросу (по названию без учета регистра)
  const filteredProducts = useMemo(() => {
    if (!products?.length) return []

    if (!searchQuery.trim()) return products

    const normalizedQuery = searchQuery.toLowerCase().trim()
    return products?.filter(product => {
      const name = product.name?.toLowerCase() || ""
      return name.includes(normalizedQuery)
    })
  }, [products, searchQuery])

  // Вычисляем товары для текущей страницы
  const paginatedProducts = useMemo(() => {
    if (!filteredProducts.length) return []

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage])

  if (!products?.length) {
    return <div className="py-12 text-center text-p text-gray">Товары не найдены</div>
  }

  return (
    <div className={`flex-1 min-w-0 ${selectedCategorySlug ? "block" : "hidden lg:block"}`}>
      {filteredProducts.length > 0 ? (
        <>
          <Products products={paginatedProducts} selectedCategorySlug={selectedCategorySlug} />
          <div className="my-8 flex flex-col items-center gap-4">
            <Pagination
              current={currentPage}
              total={filteredProducts.length}
              pageSize={ITEMS_PER_PAGE}
              onChange={page => setCurrentPage(page)}
              showSizeChanger={false}
              showTotal={(total, range) => `Показано ${range[0]}-${range[1]} из ${total} товаров`}
            />
          </div>
        </>
      ) : (
        <div className="py-12 text-center text-p text-gray">
          {searchQuery ? "Товары по запросу не найдены" : "Товары не найдены"}
        </div>
      )}
    </div>
  )
}
