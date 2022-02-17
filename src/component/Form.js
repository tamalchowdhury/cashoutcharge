/*
Copyright 2021 Tamal Anwar Chowdhury

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import "./form.scss"

import { useLayoutEffect, useRef, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import {
  calculateCharge,
  makeCapitalCase,
  rateInfo,
  popularAmounts,
} from "../helpers/"

export default function Form({ lang, service, value, setValue, switchLang }) {
  const defaultTitle = `${makeCapitalCase(service)} Cashout Charge Calculator`
  const defaultDescription = `${makeCapitalCase(service)} cashout fee is ${
    rateInfo[service].app
  }% from App, and ${rateInfo[service].ussd}% from ussd/button phone`
  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState(defaultDescription)
  const inputValue = useRef()

  useLayoutEffect(() => {
    let newTitle = ""
    if (value) {
      let [app, ussd] = calculateCharge(service, value)
      let fee = ussd
      let amount = parseInt(value)
      let bnTitle = switchLang(
        `Cashout Charge is ${fee} Tk`,
        "ক্যাশআউট চার্জ ৫ টাকা"
      )

      newTitle = `${
        lang === "en"
          ? amount.toLocaleString("en-IN")
          : amount.toLocaleString("bn-IN")
      } Tk ${makeCapitalCase(
        service
      )} Cashout Charge is ${fee} Tk (Total: ${parseInt(
        amount + fee
      ).toLocaleString("en-IN")})`
    } else {
      newTitle = defaultTitle
    }
    setTitle(newTitle)
  }, [value])

  function handleSubmit(e) {
    e.preventDefault()
  }

  function handleChange(e) {
    let value = e.target.value
    if (value.length < 7) {
      setValue(
        lang === "en"
          ? value.toLocaleString("en-IN")
          : value.toLocaleString("bn-IN")
      )
    }
  }

  async function handleShare() {
    const shareData = {
      title,
      text: title,
      url: window.location.href + "/" + value,
    }
    await navigator.share(shareData)
  }

  function calcFee(amount, percent) {
    let fee = Math.ceil((amount * percent) / 100)
    return fee
  }

  const fee = calcFee(value, rateInfo[service].ussd)

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="form">
        <div className="form__title">
          <h1>{switchLang("Cashout Calculator", "ক্যাশআউট ক্যালকুলেটর")}</h1>
        </div>
        <div className="form__body">
          <form onSubmit={handleSubmit} className="">
            <input
              className=""
              type="text"
              inputMode="numeric"
              step={500}
              name="amount"
              ref={inputValue}
              value={value}
              onChange={handleChange}
              placeholder={value}
              aria-label="amount"
              autoComplete="off"
              autoFocus={true}
            />
          </form>
        </div>
        <div className="form__suggestion">
          <strong>
            {switchLang("Popular Amounts:", "অন্যান্য এমাউন্টঃ")}{" "}
          </strong>{" "}
          {popularAmounts.map((amount) => (
            <div
              className="form__suggestion__item"
              key={amount}
              onClick={() => setValue(amount)}
            >
              <span className="form__suggestion__item__symbol__left">৳</span>
              <span className="form__suggestion__item__symbol__right">৳</span>
              {lang === "en"
                ? amount.toLocaleString("en-IN")
                : amount.toLocaleString("bn-IN")}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-md text-gray-800 ">
          {title}
          {value && navigator.share && (
            <button
              className="text-sm bg-green-500 rounded-md text-white mx-2 px-2 text-center"
              onClick={handleShare}
            >
              SHARE
            </button>
          )}
        </h2>

        {value && (
          <>
            <h3 className="">{switchLang("Breakdown:", "বিস্তারিতঃ")}</h3>
            <ul>
              <li>
                Amount with charge ({value} + {fee}) ={" "}
                {parseInt(value) + parseInt(fee)} Taka
              </li>
              <li>
                Amount without charge ({value} - {fee}) ={" "}
                {parseInt(value) - parseInt(fee)} Taka
              </li>
            </ul>

            <p>
              {service} fee is {rateInfo[service].app}% with the app and{" "}
              {rateInfo[service].ussd}% with button phone
            </p>
          </>
        )}
      </div>
    </HelmetProvider>
  )
}
