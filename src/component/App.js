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

import "./app.scss"
import Form from "./Form"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { useEffect, useLayoutEffect, useState } from "react"
import { providers } from "../helpers"
import ReactGA from "react-ga"
import Bkash from "./Bkash/Bkash"
import Nagad from "./Nagad/Nagad"
import Rocket from "./Rocket/Rocket"
import Upay from "./Upay/Upay"
import Home from "./Home/Home"
// Redux
import { useSelector, useDispatch } from "react-redux"
import { switchLang } from "../features/langSlice"
import { Redirect } from "react-router-dom"

// Google Analytics
const trackingId = "UA-44799005-18"
ReactGA.initialize(trackingId)
ReactGA.pageview(window.location.pathname + window.location.search)

function App() {
  const [value, setValue] = useState()
  const [theme, setTheme] = useState("nagad--theme")
  const lang = useSelector((state) => state.lang.value)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem("cashoutlang", lang)
  }, [lang])

  // Getting the amount from the url path
  useLayoutEffect(() => {
    let path = window.location.pathname
    let item = path.split("/")
    let amount = item.pop()

    if (!amount) {
      amount = item.pop()
    }
    amount = parseInt(amount)
    if (amount) {
      setValue(amount)
    }
  }, [])

  function text(englishText, banglaText = englishText) {
    if (lang === "bn") {
      return banglaText
    } else {
      return englishText
    }
  }

  const templang = {
    switch(englishText, banglaText) {
      if (lang === "bn") {
        return banglaText
      } else {
        return englishText
      }
    },
    toMoney(amount) {
      if (lang === "bn") {
        return amount.toLocaleString("bn-IN")
      } else {
        return amount.toLocaleString("en-IN")
      }
    },
    current: lang,
  }

  const money = {
    setValue(value) {
      setValue(value)
    },
    value: value,
  }

  return (
    <div id="app" className="app">
      <Router>
        <header className="header">
          <h1 className="">
            <Link to="/" onClick={() => setValue("")}>
              {lang === "en" ? "CashoutCharge.com" : "ক্যাশআউট চার্জ.কম"}
            </Link>
          </h1>
          {/* language switcher */}
          <select onChange={(e) => dispatch(switchLang(e.target.value))}>
            <option value="en" selected={lang === "en"}>
              English
            </option>
            <option value="bn" selected={lang === "bn"}>
              বাংলা
            </option>
          </select>
        </header>
        <nav className={`menu ${lang === "en" ? "menu--en" : "menu--bn"}`}>
          <Link
            to="/nagad"
            className="menu__item nagad--theme"
            onClick={() => setTheme("nagad--theme")}
          >
            {lang === "en" ? "Nagad" : "নগদ"}
          </Link>
          <Link
            to="/bkash"
            className="menu__item bkash--theme"
            onClick={() => setTheme("bkash--theme")}
          >
            {lang === "en" ? "Bkash" : "বিকাশ"}
          </Link>

          {/* <Link to="/rocket" className="menu__item">
            {lang === "en" ? "Rocket" : "রকেট"}
          </Link> */}
          {/* <Link
            to="/upay"
            className="menu__item upay--theme"
            onClick={() => setTheme("upay--theme")}
          >
            {lang === "en" ? "Upay" : "উপায়"}
          </Link> */}
        </nav>
        <div className="">
          <div className="">
            <Switch>
              <Route path="/bkash" component={() => <Bkash text={text} />} />
              <Route path="/nagad" component={() => <Nagad text={text} />} />
              <Route path="/rocket" component={() => <Rocket text={text} />} />
              <Route path="/upay" component={() => <Upay text={text} />} />
              <Route exact path="/">
                <Redirect to="/nagad" />
              </Route>
            </Switch>

            <footer className="footer">
              <p>
                By{" "}
                <a
                  href="https://twitter.com/tamalweb"
                  target="_blank"
                  rel="author"
                >
                  Tamal Web
                </a>{" "}
              </p>
            </footer>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
