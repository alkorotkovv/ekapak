"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (page > 1) params.set("page", page.toString())
    if (searchQuery) params.set("search", searchQuery)
    const query = params.toString()
    return query ? `${pathname}?${query}` : pathname
  }

  // Показываем максимум 5 страниц вокруг текущей
  const getVisiblePages = () => {
    const pages: (number | null)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, currentPage + 2)

    if (start > 1) pages.push(1, null)
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < totalPages) pages.push(null, totalPages)

    return pages
  }

  return (
    <div className="my-8 flex items-center justify-center gap-2">
      <Link
        href={getPageUrl(currentPage - 1)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "bg-white border border-lightgray hover:bg-lightgray hover:bg-opacity-10"
        }`}
      >
        Назад
      </Link>

      {getVisiblePages().map((page, i) => {
        if (page === null) {
          return (
            <span key={`ellipsis-${i}`} className="px-2 text-gray">
              ...
            </span>
          )
        }

        return (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[44px] text-center ${
              page === currentPage
                ? "bg-blue text-white"
                : "bg-white border border-lightgray hover:bg-lightgray hover:bg-opacity-10"
            }`}
          >
            {page}
          </Link>
        )
      })}

      <Link
        href={getPageUrl(currentPage + 1)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : "bg-white border border-lightgray hover:bg-lightgray hover:bg-opacity-10"
        }`}
      >
        Вперед
      </Link>
    </div>
  )
}
