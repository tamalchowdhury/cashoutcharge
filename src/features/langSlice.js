import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: "en",
}

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setEn(state) {
      state.value = "en"
    },
    setBn(state) {
      state.value = "bn"
    },
    switchLang(state, action) {
      state.value = action.payload
    },
  },
})

export const { setBn, setEn, switchLang } = langSlice.actions
export default langSlice.reducer
