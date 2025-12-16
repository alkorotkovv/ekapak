import { ProductList } from "@/components/ProductList"
import { fetchProducts, fetchCategories } from "@/utils/api"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { CategoryList } from "@/components/CategoryList"
import { Pagination } from "@/components/Pagination"
import { ITEMS_PER_PAGE, REVALIDATE_PRODUCTS } from "@/utils/constants"
import { filterProducts } from "@/utils/search"

export const revalidate = REVALIDATE_PRODUCTS

interface CatalogPageProps {
  params: {
    slug?: string[]
  }
  searchParams: {
    page?: string
    search?: string
  }
}

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  // Если slug передан, берем первый элемент массива, иначе undefined (все товары)
  const categorySlug = params.slug?.[0]

  // Получаем параметры из URL
  const currentPage = parseInt(searchParams.page || "1", 10)
  const searchQuery = searchParams.search || ""

  // Загружаем категории и находим uuid по slug (для запроса товаров)
  const categories = await fetchCategories()
  const category = categorySlug ? categories.find(cat => cat.slug === categorySlug) : null
  const categoryUuid = category?.uuid

  // Загружаем все товары (API не поддерживает пагинацию)
  const allProducts = await fetchProducts(categoryUuid)

  // Фильтруем товары по поисковому запросу на сервере (SSR)
  const filteredProducts = filterProducts(allProducts, searchQuery)

  // Вычисляем пагинацию для отфильтрованных товаров
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const products = filteredProducts.slice(startIndex, endIndex)

  return (
    <div className="flex flex-1 flex-col max-w-container mx-auto w-full">
      <Breadcrumbs
        items={[
          { title: "Главная", href: "/" },
          { title: "Каталог", href: "/catalog" },
          ...(category ? [{ title: category.name }] : []),
        ]}
      />

      <div className="flex flex-1 gap-8 lg:flex-row flex-col">
        <CategoryList categories={categories} selectedCategorySlug={categorySlug} />
        <div className="flex-1 min-w-0">
          <ProductList products={products} selectedCategorySlug={categorySlug} />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}
