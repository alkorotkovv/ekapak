"use client"

import { useCategories } from "@/hooks/useCategories"

interface CategoriesProps {
  selectedCategory?: string
  onCategorySelect: (categoryUuid: string | undefined) => void
}

export function Categories({ selectedCategory, onCategorySelect }: CategoriesProps) {
  const { data, isLoading, error } = useCategories()

  if (isLoading)
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="py-8 text-center text-gray">Загрузка категорий...</div>
      </div>
    )
  if (error)
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="py-8 text-center text-red-600">Ошибка загрузки категорий</div>
      </div>
    )
  if (!data || !data.data) return null

  // Фильтруем только корневые категории (без родителей)
  const rootCategories = data.data.filter(cat => !cat.parents || cat.parents.length === 0)

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h2 className="text-h2 text-black px-6 pt-6 pb-4">Каталог товаров</h2>
      <div className="flex flex-col">
        {rootCategories.map((category, index) => {
          const isSelected = selectedCategory === category.uuid
          return (
            <div key={category.uuid}>
              <button
                onClick={() => {
                  if (!isSelected) {
                    onCategorySelect(category.uuid)
                  }
                }}
                disabled={isSelected}
                className={`w-full flex items-center justify-between px-6 py-4 text-left text-sm text-black transition-colors ${
                  isSelected
                    ? "bg-blue bg-opacity-10 text-blue font-medium cursor-default"
                    : "hover:bg-lightgray hover:bg-opacity-10 cursor-pointer"
                }`}
              >
                <span>{category.name}</span>
                <svg
                  className="w-4 h-4 text-black flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              {index < rootCategories.length - 1 && (
                <div className="border-b border-lightgray mx-6" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
