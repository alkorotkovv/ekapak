import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "@/utils/api"
import { Category } from "@/types"

// Клиентский hook для получения списка категорий
// Использует функции из utils/api.ts, чтобы избежать дублирования кода
export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
