import { Catalog } from "@/page-components/Catalog"
import { fetchProducts } from "@/utils/api"

export const revalidate = 60 // ISR

interface CatalogPageProps {
  params: {
    uuid?: string[]
  }
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  // Если uuid передан, берем первый элемент массива, иначе undefined (все товары)
  const categoryUuid = params.uuid?.[0]

  // Нативная загрузка на сервере
  const initialProducts = await fetchProducts(categoryUuid)

  // Просто передаем данные
  return <Catalog categoryUuid={categoryUuid} initialProducts={initialProducts} />
}
