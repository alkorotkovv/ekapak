import { fetchProducts } from "@/utils/api"
import { ProductList } from "./ProductList"

interface ProductListWrapperProps {
  categoryUuid?: string
  selectedCategorySlug?: string
}

// Отдельный async компонент для загрузки товаров
// Обертывается в Suspense для гранулярного контроля loading
export async function ProductListWrapper({
  categoryUuid,
  selectedCategorySlug,
}: ProductListWrapperProps) {
  const products = await fetchProducts(categoryUuid)

  return <ProductList products={products} selectedCategorySlug={selectedCategorySlug} />
}
