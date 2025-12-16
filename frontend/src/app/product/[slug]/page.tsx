import { fetchProduct } from "@/utils/api"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ProductDetails } from "@/components/ProductDetails"
import { REVALIDATE_PRODUCTS } from "@/utils/constants"

export const revalidate = REVALIDATE_PRODUCTS

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Нативная загрузка на сервере по slug
  const product = await fetchProduct(params.slug)

  const productName = product?.name || "Без названия"

  return (
    <div className="flex flex-1 max-w-container mx-auto w-full">
      <main className="flex-1 w-full">
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Каталог", href: "/catalog" },
            { title: productName },
          ]}
        />

        <ProductDetails product={product} />
      </main>
    </div>
  )
}
