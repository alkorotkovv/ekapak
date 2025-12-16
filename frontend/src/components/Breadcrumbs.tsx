import Link from "next/link"

interface Crumb {
  title: string
  href?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
}

// Компонент хлебных крошек
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-xs lg:text-sm my-1 mx-4 flex items-center flex-wrap gap-1">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
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
