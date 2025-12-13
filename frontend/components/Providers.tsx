"use client"

import { useRef } from "react"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "antd"
import { makeStore } from "@/store/store"

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null)
  const queryClientRef = useRef<QueryClient | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          refetchOnWindowFocus: false,
        },
      },
    })
  }

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClientRef.current}>
        <ConfigProvider>{children}</ConfigProvider>
      </QueryClientProvider>
    </Provider>
  )
}
