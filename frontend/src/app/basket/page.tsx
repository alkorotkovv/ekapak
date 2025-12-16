import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Basket } from "@/components/basket/Basket"

export default function BasketPage() {
  return (
    <div className="flex flex-1 max-w-container mx-auto w-full">
      <main className="flex-1 w-full">
        <Breadcrumbs items={[{ title: "Главная", href: "/" }, { title: "Корзина" }]} />
        <Basket />
      </main>
    </div>
  )
}
