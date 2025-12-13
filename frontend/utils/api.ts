import { Product, Category } from "@/types"

// Базовый URL API
// Эти функции используются на сервере (SSR) и на клиенте (через hooks)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ekapak.ru/api"

/**
 * Получение списка товаров
 * Используется на сервере (SSR prefetch) и на клиенте (через useProducts hook)
 * @param categoryUuid - UUID категории (опционально)
 */
export const fetchProducts = async (categoryUuid?: string): Promise<Product[]> => {
  const url = categoryUuid
    ? `${API_BASE_URL}/products?category=${categoryUuid}`
    : `${API_BASE_URL}/products`
  const response = await fetch(url, {
    // next: { revalidate } работает только на сервере (Server Components)
    // На клиенте это игнорируется, но не вызывает ошибок
    next: { revalidate: 60 }, // Revalidate every 60 seconds for SSR
  })
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  const result = await response.json()
  return result.data || []
}

/**
 * Получение одного товара по UUID
 * Используется на сервере (SSR prefetch) и на клиенте (через useProduct hook)
 * @param uuid - UUID товара
 */
export const fetchProduct = async (uuid: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${uuid}`, {
    next: { revalidate: 60 },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  const result = await response.json()
  return result.data || {}
}

/**
 * Получение списка категорий
 * Используется на сервере (SSR prefetch) и на клиенте (через useCategories hook)
 */
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  })
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  const result = await response.json()
  return result.data || []
}
