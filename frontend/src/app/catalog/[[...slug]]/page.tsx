import { ProductList } from "@/components/ProductList"
import { fetchProducts, fetchCategories } from "@/utils/api"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { CategoryList } from "@/components/CategoryList"

export const revalidate = 60

interface CatalogPageProps {
  params: {
    slug?: string[]
  }
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  // Если slug передан, берем первый элемент массива, иначе undefined (все товары)
  const categorySlug = params.slug?.[0]

  // Загружаем категории и находим uuid по slug (для запроса товаров)
  const categories = await fetchCategories()
  const category = categorySlug ? categories.find(cat => cat.slug === categorySlug) : null
  const categoryUuid = category?.uuid

  // Загрузка по uuid (API требует uuid)
  const products = await fetchProducts(categoryUuid)

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
        <ProductList products={products} selectedCategorySlug={categorySlug} />
      </div>
    </div>
  )
}
