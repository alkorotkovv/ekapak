import { Product } from "@/page-components/Product"
import { fetchProduct } from "@/utils/api"

export const revalidate = 60 // ISR

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Нативная загрузка на сервере по slug
  const product = await fetchProduct(params.slug)

  // Просто передаем данные
  return <Product slug={params.slug} product={product} />
}
