import type { Product } from "@/types"

/**
 * Фильтрует товары по поисковому запросу
 * Ищет в названии, описании и артикуле
 */
export function filterProducts(products: Product[], searchQuery: string): Product[] {
  if (!searchQuery.trim()) {
    return products
  }

  const query = searchQuery.toLowerCase().trim()

  return products.filter(product => {
    const name = product.name?.toLowerCase() || ""
    const description = product.description?.toLowerCase() || ""
    const article = product.article?.toLowerCase() || ""

    return name.includes(query) || description.includes(query) || article.includes(query)
  })
}
