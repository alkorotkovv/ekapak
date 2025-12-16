export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ekapak.ru/api"

export const ITEMS_PER_PAGE = 4

// Revalidation times (in seconds) for ISR (Incremental Static Regeneration)
// Определяет, как часто Next.js будет перегенерировать страницы/данные
export const REVALIDATE_PRODUCTS = 60 // 1 минута - товары часто меняются (цены, наличие)
export const REVALIDATE_CATEGORIES = 300 // 5 минут - категории меняются редко
