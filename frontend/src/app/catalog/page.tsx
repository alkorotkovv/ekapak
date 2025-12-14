import { Catalog } from "@/pages/Catalog"
import { fetchProducts } from "@/utils/api"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"

export default async function CatalogPage() {
  const queryClient = new QueryClient()

  // Prefetch товары на сервере для SSR
  await queryClient.prefetchQuery({
    queryKey: ["products", undefined],
    queryFn: () => fetchProducts(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog />
    </HydrationBoundary>
  )
}
