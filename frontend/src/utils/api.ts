import { Product, Category, ProductsResponse, CategoriesResponse } from "@/types"
import { API_BASE_URL, REVALIDATE_PRODUCTS, REVALIDATE_CATEGORIES } from "@/utils/constants"

/**
 * Получение списка товаров
 */
export const fetchProducts = async (categoryUuid?: string): Promise<Product[]> => {
  const url = categoryUuid
    ? `${API_BASE_URL}/products?category=${categoryUuid}`
    : `${API_BASE_URL}/products`
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_PRODUCTS },
  })
  if (!response.ok) {
    throw new Error("Ошибка при получении товаров: " + categoryUuid ? categoryUuid : "Всех")
  }
  const result: ProductsResponse = await response.json()
  return result.data || []
}

/**
 * Получение одного товара по slug
 */
export const fetchProduct = async (slug: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/slug/${slug}`, {
    next: { revalidate: REVALIDATE_PRODUCTS },
  })
  if (!response.ok) {
    throw new Error("Ошибка при получении товара: " + slug)
  }
  const result: { data: Product } = await response.json()
  return result.data
}

/**
 * Получение списка категорий
 */
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    next: { revalidate: REVALIDATE_CATEGORIES },
  })
  if (!response.ok) {
    throw new Error("Ошибка при получении категорий")
  }
  const result: CategoriesResponse = await response.json()
  return result.data || []
}
