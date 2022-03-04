import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: "",
}

export const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    setAmount(state, action) {
      state.value = action.payload
    },
  },
})

export const { setAmount } = amountSlice.actions
export default amountSlice.reducer
