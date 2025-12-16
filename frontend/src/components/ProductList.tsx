import type { Product } from "@/types"
import { ProductCard } from "./ProductCard"

interface ProductListProps {
  products?: Product[]
  selectedCategorySlug?: string
}

// Компонент для каталога товаров
export function ProductList({ products, selectedCategorySlug }: ProductListProps = {}) {
  if (!products?.length) {
    return (
      <div className={`flex-1 min-w-0 ${selectedCategorySlug ? "block" : "hidden lg:block"}`}>
        <div className="py-12 text-center text-p text-gray">Товары не найдены</div>
      </div>
    )
  }

  return (
    <div className={`flex-1 min-w-0 ${selectedCategorySlug ? "block" : "hidden lg:block"}`}>
      <div className="max-w-products mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-[10px]">
          {products?.map(product => (
            <ProductCard
              key={product.uuid}
              product={product}
              selectedCategory={selectedCategorySlug}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
