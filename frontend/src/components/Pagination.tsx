import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl
    return `${baseUrl}?page=${page}`
  }

  // Генерируем массив страниц для отображения
  const getVisiblePages = () => {
    const maxVisible = 7 // Максимум видимых страниц
    const pages: (number | string)[] = []

    if (totalPages <= maxVisible) {
      // Если страниц мало, показываем все
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Всегда показываем первую страницу
    pages.push(1)

    // Определяем диапазон вокруг текущей страницы
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    // Если текущая страница близко к началу
    if (currentPage <= 3) {
      start = 2
      end = 4
    }

    // Если текущая страница близко к концу
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3
      end = totalPages - 1
    }

    // Добавляем многоточие перед диапазоном, если нужно
    if (start > 2) {
      pages.push("ellipsis-start")
    }

    // Добавляем страницы в диапазоне
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Добавляем многоточие после диапазона, если нужно
    if (end < totalPages - 1) {
      pages.push("ellipsis-end")
    }

    // Всегда показываем последнюю страницу
    pages.push(totalPages)

    return pages
  }

  const visiblePages = getVisiblePages()
  const isPrevDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages

  const buttonBaseClasses =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[80px] text-center"
  const buttonActiveClasses =
    "bg-white border border-lightgray hover:bg-lightgray hover:bg-opacity-10"
  const buttonDisabledClasses =
    "bg-lightgray bg-opacity-20 border border-lightgray text-gray cursor-not-allowed opacity-50"

  return (
    <div className="my-8 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {/* Кнопка "Назад" - всегда видна */}
        {isPrevDisabled ? (
          <span className={`${buttonBaseClasses} ${buttonDisabledClasses}`}>Назад</span>
        ) : (
          <Link
            href={getPageUrl(currentPage - 1)}
            className={`${buttonBaseClasses} ${buttonActiveClasses}`}
          >
            Назад
          </Link>
        )}

        {/* Номера страниц */}
        {visiblePages.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray">
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isActive = pageNumber === currentPage

          return (
            <Link
              key={pageNumber}
              href={getPageUrl(pageNumber)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[44px] text-center ${
                isActive
                  ? "bg-blue text-white"
                  : "bg-white border border-lightgray hover:bg-lightgray hover:bg-opacity-10"
              }`}
            >
              {pageNumber}
            </Link>
          )
        })}

        {/* Кнопка "Вперед" - всегда видна */}
        {isNextDisabled ? (
          <span className={`${buttonBaseClasses} ${buttonDisabledClasses}`}>Вперед</span>
        ) : (
          <Link
            href={getPageUrl(currentPage + 1)}
            className={`${buttonBaseClasses} ${buttonActiveClasses}`}
          >
            Вперед
          </Link>
        )}
      </div>

      {/* Информация о странице */}
      <p className="text-sm text-gray">
        Страница {currentPage} из {totalPages}
      </p>
    </div>
  )
}
