import { useEffect, useState } from "react"
import { popularAmounts } from "../../helpers/"
import "./bkash.scss"
import { calculateCharge } from "../../helpers"
import { useSelector, useDispatch } from "react-redux"
import { setAmount } from "../../features/amountSlice"
import Form from "../Form/Form"

export default function Bkash({ text }) {
  const lang = useSelector((state) => state.lang.value)
  const amount = useSelector((state) => state.amount.value)
  const dispatch = useDispatch()

  // Function to replace bangla numbers to enlish counter parts

  const [app, ussd] = calculateCharge("bkash", amount)

  return (
    <>
      <div className="form">
        <div className="form__title">
          <h1>
            {text("Bkash Cashout Calculator", "বিকাশ ক্যাশআউট ক্যালকুলেটর")}
          </h1>
        </div>
        <Form />
        <div className="form__suggestions">
          {popularAmounts.map((amount) => (
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
        <div className="form__info">
          {amount && (
            <div className="form__info__title">
              <h2>
                {/* this needs some refining when language switching
                  // Currently does not change to BN when typeing out number
                */}
                {lang === "bn"
                  ? parseInt(amount).toLocaleString("bn-IN")
                  : parseInt(amount).toLocaleString("en-IN")}{" "}
                {text(
                  "Taka Bkash Cashout Charge is",
                  "টাকা বিকাশ ক্যাশআউট চার্জ"
                )}{" "}
                {lang === "bn"
                  ? parseInt(app).toLocaleString("bn-IN")
                  : parseInt(app).toLocaleString("en-IN")}{" "}
                {text("Taka", "টাকা")}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
