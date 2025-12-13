import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"

export interface BasketItem {
  product: Product
  quantity: number
}

interface BasketState {
  items: BasketItem[]
  total: number
}

const initialState: BasketState = {
  items: [],
  total: 0,
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload
      const offer = product.offers && product.offers.length > 0 ? product.offers[0] : null
      if (!offer) return

      const existingItem = state.items.find(item => item.product.uuid === product.uuid)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ product, quantity })
      }

      state.total = state.items.reduce((sum, item) => {
        const itemOffer =
          item.product.offers && item.product.offers.length > 0 ? item.product.offers[0] : null
        return sum + (itemOffer ? parseFloat(itemOffer.price) * item.quantity : 0)
      }, 0)
    },
    removeFromBasket: (state, action: PayloadAction<{ productUuid: string }>) => {
      state.items = state.items.filter(item => item.product.uuid !== action.payload.productUuid)
      state.total = state.items.reduce((sum, item) => {
        const itemOffer =
          item.product.offers && item.product.offers.length > 0 ? item.product.offers[0] : null
        return sum + (itemOffer ? parseFloat(itemOffer.price) * item.quantity : 0)
      }, 0)
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productUuid: string
        quantity: number
      }>
    ) => {
      const item = state.items.find(item => item.product.uuid === action.payload.productUuid)
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.product.uuid !== action.payload.productUuid)
        }
      }
      state.total = state.items.reduce((sum, item) => {
        const itemOffer =
          item.product.offers && item.product.offers.length > 0 ? item.product.offers[0] : null
        return sum + (itemOffer ? parseFloat(itemOffer.price) * item.quantity : 0)
      }, 0)
    },
  },
})

export const { addToBasket, removeFromBasket, updateQuantity } = basketSlice.actions
export default basketSlice.reducer
