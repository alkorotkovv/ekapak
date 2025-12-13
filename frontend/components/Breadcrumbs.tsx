"use client"

import Link from "next/link"
import { useCategories } from "@/hooks/useCategories"

interface BreadcrumbsProps {
  categoryUuid?: string
  productName?: string
  pageName?: string
}

export function Breadcrumbs({ categoryUuid, productName, pageName }: BreadcrumbsProps) {
  const { data: categories } = useCategories()

  const category = categoryUuid ? categories?.find(cat => cat.uuid === categoryUuid) : null

  const items = [{ label: "Главная", href: "/" }]

  // Если это страница корзины, не добавляем "Каталог"
  if (!pageName || pageName !== "Корзина") {
    items.push({ label: "Каталог", href: "/catalog" })
  }

  if (category) {
    items.push({
      label: category.name,
      href: `/catalog?category=${category.uuid}`,
    })
  }

  if (productName) {
    items.push({
      label: productName,
      href: "#",
    })
  }

  if (pageName) {
    items.push({
      label: pageName,
      href: "#",
    })
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-gray m-1 lg:m-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-lightgray">/</span>}
          {index === items.length - 1 ? (
            <span className="text-black">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-blue transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
