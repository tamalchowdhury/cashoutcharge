import { useEffect, useState } from "react"
import { popularAmounts } from "../../helpers"
// import "./Upay.scss"
import { useSelector, useDispatch } from "react-redux"
import { setAmount } from "../../features/amountSlice"
import Form from "../Form/Form"
import { Helmet, HelmetProvider } from "react-helmet-async"

export default function Upay({ text }) {
  const lang = useSelector((state) => state.lang.value)
  const amount = useSelector((state) => state.amount.value)
  const [rate, setRate] = useState(1.75)
  const [method, setMethod] = useState("app")
  const dispatch = useDispatch()
  let fee = calculateCharge(amount)

  const rates = {
    app: 1.4,
    ussd: 1.4,
  }

  // Function to replace bangla numbers to enlish counter parts

  useEffect(() => {
    fee = calculateCharge(amount)
    setRate(rates[method])
  }, [amount, method])

  function calculateCharge(amount) {
    let result = Math.ceil((amount * rate) / 100)
    return result
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Upay Cashout Calculator - উপায় ক্যাশআউট ক্যালকুলেটর</title>
          <meta
            name="description"
            content="Use this free Upay cashout calculator to check the charge"
          />
        </Helmet>
        <div className="shell upay--theme">
          <div className="form">
            <div className="form__title">
              <h1>
                {amount ? (
                  <>
                    {lang === "bn"
                      ? parseInt(amount).toLocaleString("bn-IN")
                      : parseInt(amount).toLocaleString("en-IN")}{" "}
                    {text("Upay fee", "উপায় চার্জ")}{" "}
                    {lang === "bn"
                      ? parseInt(fee).toLocaleString("bn-IN")
                      : parseInt(fee).toLocaleString("en-IN")}
                  </>
                ) : (
                  <>
                    {text(
                      "Upay Cashout Calculator",
                      "উপায় ক্যাশআউট ক্যালকুলেটর"
                    )}
                  </>
                )}
              </h1>
            </div>
            <div className="form__choice">
              {text("Cashing out from:", "ক্যাশআউট এর মাধ্যমঃ")}{" "}
              <select name="" id="" onChange={(e) => setMethod(e.target.value)}>
                <option value="app">App</option>
                <option value="ussd">*268#</option>
              </select>{" "}
              {lang === "bn" ? rate.toLocaleString("bn-IN") : rate}%
            </div>
            <Form />
            <div className="form__suggestions">
              {popularAmounts.map((amount) => (
                <div
                  className="form__suggestion__item"
                  key={amount}
                  onClick={() => dispatch(setAmount(amount))}
                >
                  <span className="form__suggestion__item__symbol__left">
                    ৳
                  </span>
                  <span className="form__suggestion__item__symbol__right">
                    ৳
                  </span>
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
                      "Taka Upay Cashout Charge is",
                      "টাকা উপায় ক্যাশআউট চার্জ"
                    )}{" "}
                    {lang === "bn"
                      ? parseInt(fee).toLocaleString("bn-IN")
                      : parseInt(fee).toLocaleString("en-IN")}{" "}
                    {text("Taka", "টাকা")}
                  </h2>
                  <p>
                    <strong>{text("Details:", "বিস্তারিতঃ")}</strong>
                  </p>
                  <ul>
                    <li>
                      {text("with cashout fee:", "খরচ সহঃ")}{" "}
                      {lang === "bn"
                        ? parseInt(amount).toLocaleString("bn-IN")
                        : parseInt(amount).toLocaleString("en-IN")}
                      +
                      {lang === "bn"
                        ? parseInt(fee).toLocaleString("bn-IN")
                        : parseInt(fee).toLocaleString("en-IN")}{" "}
                      ={" "}
                      {lang === "bn"
                        ? parseInt(amount - 0 + fee).toLocaleString("bn-IN")
                        : parseInt(amount - 0 + fee).toLocaleString(
                            "en-IN"
                          )}{" "}
                    </li>
                    <li>
                      {text("without fee:", "খরচ ছাড়াঃ")}{" "}
                      {lang === "bn"
                        ? parseInt(amount).toLocaleString("bn-IN")
                        : parseInt(amount).toLocaleString("en-IN")}
                      -
                      {lang === "bn"
                        ? parseInt(fee).toLocaleString("bn-IN")
                        : parseInt(fee).toLocaleString("en-IN")}{" "}
                      ={" "}
                      {lang === "bn"
                        ? parseInt(amount - fee).toLocaleString("bn-IN")
                        : parseInt(amount - fee).toLocaleString("en-IN")}{" "}
                    </li>
                    <li>
                      {text(
                        `Upay charge from ${
                          method === "app" ? "App" : "Button Phone"
                        } is ${rate}%`,
                        `${
                          method === "app" ? "এপ" : "বাটন ফোন"
                        } থেকে উপায় চার্জ ${rate.toLocaleString("bn-IN")}%`
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  )
}
