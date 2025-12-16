"use client"

import { useEffect } from "react"
import Link from "next/link"

interface ErrorMessageProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  backHref?: string
  backLabel?: string
}

export function ErrorMessage({
  error,
  reset,
  title = "Произошла ошибка",
  backHref = "/",
  backLabel = "На главную",
}: ErrorMessageProps) {
  useEffect(() => {
    console.error("Error:", error)
  }, [error])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-12 text-center">
      <h1 className="text-h1 text-black mb-4 lg:mb-6">{title}</h1>
      <p className="text-p text-gray mb-6 lg:mb-8">
        {error.message || "Попробуйте обновить страницу или вернуться назад."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-lightblue transition-colors text-sm lg:text-base font-medium"
        >
          Попробовать снова
        </button>
        <Link
          href={backHref}
          className="px-6 py-3 bg-lightgray bg-opacity-30 text-black rounded-lg hover:bg-opacity-40 transition-colors text-sm lg:text-base font-medium"
        >
          {backLabel}
        </Link>
      </div>
    </div>
  )
}
