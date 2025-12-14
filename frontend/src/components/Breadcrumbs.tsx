"use client"

import { Breadcrumb } from "antd"
import Link from "next/link"
import { useCategoriesQuery } from "@/hooks/useCategories"

interface BreadcrumbsProps {
  categoryUuid?: string
  pageName?: string
}

export function Breadcrumbs({ categoryUuid, pageName }: BreadcrumbsProps) {
  const { data: categories } = useCategoriesQuery()

  const category = categoryUuid ? categories?.find(cat => cat.uuid === categoryUuid) : null
  const isBasketPage = pageName === "Корзина"

  // Декларативное описание структуры хлебных крошек
  const breadcrumbConfig = [
    { title: "Главная", href: "/", show: true },
    { title: "Каталог", href: "/catalog", show: !isBasketPage },
    {
      title: category?.name || "",
      href: categoryUuid ? `/catalog/${categoryUuid}` : "/catalog",
      show: !!category,
    },
    { title: pageName || "", href: "#", show: !!pageName },
  ]

  // Фильтруем только видимые элементы
  const items = breadcrumbConfig.filter(item => item.show && item.title)

  return (
    <Breadcrumb
      className="text-xs lg:text-sm my-1 mx-4"
      items={items.map(item => ({
        title: <Link href={item.href}>{item.title}</Link>,
      }))}
    />
  )
}
