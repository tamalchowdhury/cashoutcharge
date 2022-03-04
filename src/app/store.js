import { configureStore } from "@reduxjs/toolkit"
import langReducer from "../features/langSlice"
import amountReducer from "../features/amountSlice"

export const store = configureStore({
  reducer: {
    lang: langReducer,
    amount: amountReducer,
  },
})
