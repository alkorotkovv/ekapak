import { Product } from "@/page-components/Product"
import { fetchProduct } from "@/utils/api"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { Suspense } from "react"

interface ProductPageProps {
  params: {
    uuid: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const queryClient = new QueryClient()

  // Prefetch данные на сервере для SSR
  await queryClient.prefetchQuery({
    queryKey: ["product", params.uuid],
    queryFn: () => fetchProduct(params.uuid),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div className="py-8 text-center text-p text-gray">Загрузка...</div>}>
        <Product uuid={params.uuid} />
      </Suspense>
    </HydrationBoundary>
  )
}
