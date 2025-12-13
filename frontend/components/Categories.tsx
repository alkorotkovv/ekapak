"use client"

import Image from "next/image"
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
  if (!data || !data.length) return null

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h2 className="text-h2 text-black px-6 pt-6 pb-4">Каталог товаров</h2>
      <div className="flex flex-col">
        {data.map((category, index) => {
          const isSelected = selectedCategory === category.uuid
          return (
            <div key={category.uuid}>
              <button
                onClick={() => onCategorySelect(category.uuid)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left text-sm text-black transition-colors ${
                  isSelected
                    ? "bg-blue bg-opacity-10 text-blue font-medium"
                    : "hover:bg-lightgray hover:bg-opacity-10"
                }`}
              >
                <span>{category.name}</span>
                <Image src="/assets/icons/arrow.png" alt="arrow" width={24} height={24} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
