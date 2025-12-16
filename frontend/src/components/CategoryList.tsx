import Link from "next/link"
import Image from "next/image"
import type { Category } from "@/types"

interface CategoryListProps {
  categories: Category[]
  selectedCategorySlug?: string
}

export function CategoryList({ categories, selectedCategorySlug }: CategoryListProps) {
  return (
    <div
      className={`w-full lg:w-full lg:max-w-categories flex-shrink-0 ${
        selectedCategorySlug ? "hidden lg:block" : "block"
      }`}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <h2 className="text-h2 text-black px-6 pt-6 pb-4">Каталог товаров</h2>
        <div className="flex flex-col">
          {categories.map(cat => {
            const isSelected = selectedCategorySlug === cat.slug
            const categoryUrl = `/catalog/${cat.slug}`
            return (
              <div key={cat.uuid}>
                <Link
                  href={categoryUrl}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left text-sm text-black transition-colors ${
                    isSelected
                      ? "bg-blue bg-opacity-10 text-blue font-medium"
                      : "hover:bg-lightgray hover:bg-opacity-10"
                  }`}
                >
                  <span>{cat.name}</span>
                  <Image
                    src="/icons/arrow.png"
                    alt="arrow"
                    width={24}
                    height={24}
                    className="flex-shrink-0"
                  />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
