// components/ui/Breadcrumbs.tsx - версия без иконок
"use client"

import Link from "next/link"
import { useCategoriesQuery } from "@/hooks/useCategories"

interface BreadcrumbsProps {
  categorySlug?: string
  pageName?: string
}

export function Breadcrumbs({ categorySlug, pageName }: BreadcrumbsProps) {
  const { data: categories } = useCategoriesQuery()
  const category = categorySlug ? categories?.find(cat => cat.slug === categorySlug) : null
  const isBasketPage = pageName === "Корзина"

  const items = [
    { title: "Главная", href: "/" },
    ...(!isBasketPage ? [{ title: "Каталог", href: "/catalog" }] : []),
    ...(category ? [{ title: category.name, href: `/catalog/${category.slug}` }] : []),
    ...(pageName ? [{ title: pageName, href: "#" }] : []),
  ].filter(Boolean)

  return (
    <nav className="text-xs lg:text-sm my-1 mx-4 flex items-center flex-wrap gap-1">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href !== "#" ? (
            <>
              <Link href={item.href} className="text-blue-600 hover:text-blue-800 hover:underline">
                {item.title}
              </Link>
              {index < items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
            </>
          ) : (
            <span className="text-gray-600 font-medium">{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
