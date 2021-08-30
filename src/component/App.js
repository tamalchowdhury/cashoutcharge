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

import Form from "./Form";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { providers } from "../helpers";
import ReactGA from "react-ga";
const trackingId = "UA-44799005-18";
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const [value, setValue] = useState();

  // Getting the amount from the url path
  useLayoutEffect(() => {
    let path = window.location.pathname;
    let item = path.split("/");
    let amount = item.pop();

    if (!amount) {
      amount = item.pop();
    }
    amount = parseInt(amount);
    if (amount) {
      setValue(amount);
    }
  }, []);

  return (
    <div id="app" className="sm:w-6/12 h-screen mx-auto">
      <Router>
        <h1 className="text-center py-2">
          <Link to="/" onClick={() => setValue("")}>
            CashoutCharge.com
          </Link>
        </h1>
        <nav className="grid grid-cols-4">
          {providers.map((service) => (
            <Link
              className="text-center py-4 text-white uppercase bg-blue-400 no-underline hover:bg-blue-700"
              to={`/${service}`}
              title={service}
              key={`${service}-link`}
            >
              {service}
            </Link>
          ))}
        </nav>
        <div className="">
          <div className="">
            <div className="p-3 bg-white  ">
              <Switch>
                {providers.map((service) => (
                  <Route
                    exact
                    key={service}
                    path={`/${service}/`}
                    component={() => (
                      <Form
                        service={service}
                        value={value}
                        setValue={setValue}
                      />
                    )}
                  />
                ))}
                {providers.map((service) => (
                  <Route
                    key={`${service}-slug`}
                    path={`/${service}/:slug`}
                    component={() => (
                      <Form
                        service={service}
                        value={value}
                        setValue={setValue}
                      />
                    )}
                  />
                ))}
                <Route exact path="/">
                  <Form service="bkash" value={value} setValue={setValue} />
                </Route>
              </Switch>
              <div className="text-center">
                <p>
                  By{" "}
                  <a
                    href="https://tamalweb.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tamal Chowdhury
                  </a>{" "}
                  -{" "}
                  <a
                    href="https://github.com/tamalweb/cashoutcharge"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source Code
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
