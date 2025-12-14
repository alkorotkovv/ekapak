import { Product } from "@/page-components/Product"
import { fetchProduct } from "@/utils/api"

export const revalidate = 60 // ISR

interface ProductPageProps {
  params: {
    uuid: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Нативная загрузка на сервере
  const initialProduct = await fetchProduct(params.uuid)

  // Просто передаем данные
  return <Product uuid={params.uuid} initialProduct={initialProduct} />
}
