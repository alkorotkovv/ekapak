import { Product, Category, ProductsResponse, CategoriesResponse } from "@/types"

// Базовый URL API
// Эти функции используются на сервере (SSR prefetch) и на клиенте (через hooks)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ekapak.ru/api"

/**
 * Получение списка товаров
 * Используется на сервере (SSR prefetch) и на клиенте (через useProductsQuery hook)
 * Принимает UUID категории (не slug)
 */
export const fetchProducts = async (categoryUuid?: string): Promise<Product[]> => {
  const url = categoryUuid
    ? `${API_BASE_URL}/products?category=${categoryUuid}`
    : `${API_BASE_URL}/products`
  const response = await fetch(url, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    throw new Error("Ошибка при получении товаров: " + categoryUuid ? categoryUuid : "Всех")
  }
  const result: ProductsResponse = await response.json()
  return result.data || []
}

/**
 * Получение одного товара по slug
 * Используется на сервере (SSR prefetch) и на клиенте (через useProductQuery hook)
 */
export const fetchProduct = async (slug: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/slug/${slug}`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    throw new Error("Ошибка при получении товара: " + slug)
  }
  const result: { data: Product } = await response.json()
  return result.data
}

/**
 * Получение списка категорий
 * Используется на сервере (SSR prefetch) и на клиенте (через useCategoriesQuery hook)
 */
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    next: { revalidate: 300 },
  })
  if (!response.ok) {
    throw new Error("Ошибка при получении категорий")
  }
  const result: CategoriesResponse = await response.json()
  return result.data || []
}
