import { configureStore } from "@reduxjs/toolkit"
import basketReducer from "./slices/basketSlice"
import searchReducer from "./slices/searchSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      basket: basketReducer,
      search: searchReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
