export interface Category {
  uuid: string
  name: string
  slug: string
  children?: Category[] | null
}

interface ProductImage {
  original_url: string
  card_url: string
}

interface Offer {
  uuid: string
  price: string
  currency: string
  unit: string
  quantity: number
}

export interface Product {
  uuid: string
  name: string
  description: string
  slug: string
  category_uuid?: string
  offers_min_price?: string
  offers?: Offer[]
  article?: string
  images?: ProductImage[]
  properties?: Record<string, string>
  Наличие?: string
  "Мин. покупка, шт."?: string
  seo_description?: string
}

export interface ProductsResponse {
  data: Product[]
  meta: {
    total: number
    page?: number
    limit?: number
    totalPages?: number
    cached_at?: string
  }
}

export interface CategoriesResponse {
  data: Category[]
  meta: {
    total: number
    cached_at?: string
  }
}
