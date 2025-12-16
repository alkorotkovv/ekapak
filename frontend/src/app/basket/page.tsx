import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Basket } from "@/components/Basket"

export default function BasketPage() {
  return (
    <div className="flex flex-1 flex-col max-w-container mx-auto w-full">
      <Breadcrumbs items={[{ title: "Главная", href: "/" }, { title: "Корзина" }]} />
      <Basket />
    </div>
  )
}
