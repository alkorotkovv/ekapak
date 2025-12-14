import { Catalog } from "@/page-components/Catalog"
import { fetchProducts } from "@/utils/api"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { Suspense } from "react"

export default async function CatalogPage() {
  const queryClient = new QueryClient()

  // Prefetch товары на сервере для SSR
  await queryClient.prefetchQuery({
    queryKey: ["products", undefined],
    queryFn: () => fetchProducts(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div className="py-8 text-center text-p text-gray">Загрузка...</div>}>
        <Catalog />
      </Suspense>
    </HydrationBoundary>
  )
}
