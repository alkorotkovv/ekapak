import { Catalog } from "@/page-components/Catalog"
import { fetchProducts } from "@/utils/api"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { Suspense } from "react"

interface CatalogPageProps {
  params: {
    uuid?: string[]
  }
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const queryClient = new QueryClient()

  // Если uuid передан, берем первый элемент массива, иначе undefined (все товары)
  const categoryUuid = params.uuid?.[0]

  // Prefetch товары на сервере для SSR
  await queryClient.prefetchQuery({
    queryKey: ["products", categoryUuid],
    queryFn: () => fetchProducts(categoryUuid),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog categoryUuid={categoryUuid} />
    </HydrationBoundary>
  )
}
