import { configureStore } from "@reduxjs/toolkit"
import basketReducer from "./slices/basketSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      basket: basketReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
