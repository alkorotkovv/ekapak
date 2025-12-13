import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Product, Offer } from "@/types"

export interface CartItem {
  product: Product
  offer: Offer
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; offer: Offer }>) => {
      const { product, offer } = action.payload
      const existingItem = state.items.find(
        item => item.product.uuid === product.uuid && item.offer.uuid === offer.uuid
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ product, offer, quantity: 1 })
      }

      state.total = state.items.reduce(
        (sum, item) => sum + parseFloat(item.offer.price) * item.quantity,
        0
      )
    },
    removeFromCart: (state, action: PayloadAction<{ productUuid: string; offerUuid: string }>) => {
      state.items = state.items.filter(
        item =>
          !(
            item.product.uuid === action.payload.productUuid &&
            item.offer.uuid === action.payload.offerUuid
          )
      )
      state.total = state.items.reduce(
        (sum, item) => sum + parseFloat(item.offer.price) * item.quantity,
        0
      )
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productUuid: string
        offerUuid: string
        quantity: number
      }>
    ) => {
      const item = state.items.find(
        item =>
          item.product.uuid === action.payload.productUuid &&
          item.offer.uuid === action.payload.offerUuid
      )
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            item =>
              !(
                item.product.uuid === action.payload.productUuid &&
                item.offer.uuid === action.payload.offerUuid
              )
          )
        }
      }
      state.total = state.items.reduce(
        (sum, item) => sum + parseFloat(item.offer.price) * item.quantity,
        0
      )
    },
    clearCart: state => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
