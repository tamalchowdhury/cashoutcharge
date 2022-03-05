import { useSelector, useDispatch } from "react-redux"
import { setAmount } from "../../features/amountSlice"
const convertToEnglishNumber = require("banglanumber-to-englishnumber")

export default function Form() {
  const amount = useSelector((state) => state.amount.value)
  const dispatch = useDispatch()

  function handleChange(e) {
    let num = convertToEnglishNumber(e.target.value)
    num = num.replace(/[^0-9]/g, "")
    if (num.length < 7) {
      dispatch(setAmount(num))
    }
  }
  return (
    <div className="form__body">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={handleChange}
          type="text"
          inputMode="numeric"
          value={amount}
          aria-label="amount"
          autoComplete="off"
          autoFocus={true}
        />
      </form>
    </div>
  )
}
