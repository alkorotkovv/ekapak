"use client"

import { Product } from "@/types"
import { ProductCard } from "./ProductCard"

interface ProductsProps {
  products: Product[]
  selectedCategory?: string
}

export function Products({ products, selectedCategory }: ProductsProps) {
  if (!products.length) {
    return <div className="py-12 text-center text-p text-gray">Товары не найдены</div>
  }

  return (
    <div className="max-w-products mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]">
        {products.map(product => (
          <ProductCard key={product.uuid} product={product} selectedCategory={selectedCategory} />
        ))}
      </div>
    </div>
  )
}
