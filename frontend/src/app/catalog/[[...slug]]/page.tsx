import { Catalog } from "@/page-components/Catalog"
import { fetchProducts, fetchCategories } from "@/utils/api"

export const revalidate = 60 // ISR

interface CatalogPageProps {
  params: {
    slug?: string[]
  }
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  // Если slug передан, берем первый элемент массива, иначе undefined (все товары)
  const categorySlug = params.slug?.[0]

  // Конвертируем slug → uuid для API запроса
  let categoryUuid: string | undefined = undefined

  if (categorySlug) {
    // Загружаем категории и находим uuid по slug
    const categories = await fetchCategories()
    const category = categories.find(cat => cat.slug === categorySlug)
    categoryUuid = category?.uuid
  }

  // Нативная загрузка на сервере по uuid (API требует uuid)
  const products = await fetchProducts(categoryUuid)

  // Передаем slug для UI (breadcrumbs, категории) и uuid для API запросов на клиенте
  return <Catalog categorySlug={categorySlug} categoryUuid={categoryUuid} products={products} />
}
