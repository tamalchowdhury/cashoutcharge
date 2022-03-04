import { useSelector, useDispatch } from "react-redux"
import { setAmount } from "../../features/amountSlice"
const convertToEnglishNumber = require("banglanumber-to-englishnumber")

export default function Form() {
  const amount = useSelector((state) => state.amount.value)
  const dispatch = useDispatch()

  function handleChange(e) {
    let value = e.target.value
    if (value.length < 7) {
      let num = convertToEnglishNumber(value)
      // If it's not a number don't update it
      dispatch(setAmount(num))
    }
  }
  return (
    <div className="form__body">
      <form>
        <input
          onChange={handleChange}
          type="text"
          inputMode="numeric"
          value={amount}
        />
      </form>
    </div>
  )
}
