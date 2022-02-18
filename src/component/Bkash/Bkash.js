import { useState } from "react"
import { popularAmounts } from "../../helpers/"
import "./bkash.scss"
import { calculateCharge } from "../../helpers"

export default function Bkash({ lang, siteLang, money }) {
  const [value, setValue] = useState(0)
  const [localeValue, setLocaleValue] = useState()

  function handleChange(e) {
    let value = e.target.value
    if (value.length < 7) {
      setValue(value)
    }
  }

  const [app, ussd] = calculateCharge("bkash", value)

  return (
    <>
      <div className="form">
        <div className="form__title">
          <h1>
            {lang.switch(
              "Bkash Cashout Calculator",
              "বিকাশ ক্যাশআউট ক্যালকুলেটর"
            )}
          </h1>
        </div>
        <div className="form__body">
          <form>
            <input
              onChange={handleChange}
              type="text"
              inputMode="numeric"
              value={value}
            />
          </form>
        </div>
        <div className="form__suggestions">
          {popularAmounts.map((amount) => (
            <div
              className="form__suggestion__item"
              key={amount}
              onClick={() => setValue(amount)}
            >
              <span className="form__suggestion__item__symbol__left">৳</span>
              <span className="form__suggestion__item__symbol__right">৳</span>
              {lang.current === "en"
                ? amount.toLocaleString("en-IN")
                : amount.toLocaleString("bn-IN")}
            </div>
          ))}
        </div>
        <div className="form__info">
          {value && (
            <div className="form__info__title">
              <h2>
                {/* this needs some refining when language switching
                  // Currently does not change to BN when typeing out number
                */}
                {lang.toMoney(value)}{" "}
                {lang.switch(
                  "Taka Bkash Cashout Charge is",
                  "টাকা বিকাশ ক্যাশআউট চার্জ"
                )}{" "}
                {lang.toMoney(ussd)} {lang.switch("Taka", "টাকা")}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
