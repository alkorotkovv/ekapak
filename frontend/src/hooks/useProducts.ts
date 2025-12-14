import { useQuery } from "@tanstack/react-query"
import { fetchProducts, fetchProduct } from "@/utils/api"
import { Product } from "@/types"

// Клиентский hook для получения списка товаров
// Использует функции из utils/api.ts, чтобы избежать дублирования кода
export const useProductsQuery = (categoryUuid?: string, initialData?: Product[]) => {
  return useQuery<Product[]>({
    queryKey: ["products", categoryUuid],
    queryFn: () => fetchProducts(categoryUuid),
    initialData,
    staleTime: 60 * 1000,
  })
}

// Клиентский hook для получения одного товара
// Использует функции из utils/api.ts, чтобы избежать дублирования кода
export const useProductQuery = (uuid: string, initialData?: Product) => {
  return useQuery<Product>({
    queryKey: ["product", uuid],
    queryFn: () => fetchProduct(uuid),
    initialData,
  })
}
