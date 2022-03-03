import { configureStore } from "@reduxjs/toolkit"
import langReducer from "../features/langSlice"

export const store = configureStore({
  reducer: {
    lang: langReducer,
  },
})
