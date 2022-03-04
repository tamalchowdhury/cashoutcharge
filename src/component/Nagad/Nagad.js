import Form from "../Form/Form"
import { useSelector, useDispatch } from "react-redux"
import { setAmount } from "../../features/amountSlice"

export default function Nagad({ text }) {
  const lang = useSelector((state) => state.lang.value)
  const amount = useSelector((state) => state.amount.value)
  const dispatch = useDispatch()
  return (
    <>
      <div className="form">
        <div className="form__title">
          <h1>
            {text("Nagad Cashout Calculator", "নগদ ক্যাশআউট ক্যালকুলেটর")}
          </h1>
        </div>
        <Form />
        <div className="form__suggestions">
          {[5000, 10000, 50000].map((amount) => (
            <div
              className="form__suggestion__item"
              key={amount}
              onClick={() => dispatch(setAmount(amount))}
            >
              <span className="form__suggestion__item__symbol__left">৳</span>
              <span className="form__suggestion__item__symbol__right">৳</span>
              {lang === "en"
                ? amount.toLocaleString("en-IN")
                : amount.toLocaleString("bn-IN")}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
