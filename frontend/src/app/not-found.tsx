import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-1 max-w-container mx-auto w-full pt-4 lg:pt-8 px-2 lg:px-0">
      <main className="flex-1 w-full">
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-12 text-center">
          <h1 className="text-h1 text-black mb-4 lg:mb-6">404</h1>
          <h2 className="text-h2 text-black mb-4 lg:mb-6">Страница не найдена</h2>
          <p className="text-p text-gray mb-6 lg:mb-8">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-lightgray bg-opacity-30 text-black rounded-lg hover:bg-opacity-40 transition-colors text-sm lg:text-base font-medium"
            >
              На главную
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
