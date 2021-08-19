import Form from "./component/Form";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
} from "react-router-dom";
import { useLayoutEffect, useState } from "react";

const providers = ["bkash", "rocket", "nagad", "upay"];

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
    <div id="app" className="sm:w-6/12 h-screen mx-auto bg-blue-50">
      <Router>
        <nav className="grid grid-cols-4">
          {providers.map((service) => (
            <Link
              className="text-center p-2 text-white uppercase bg-blue-400 no-underline hover:bg-blue-700"
              to={`/${service}`}
              title={service}
              key={`${service}-link`}
            >
              {service}
            </Link>
          ))}
        </nav>
        <div className="">
          <div className=" p-3">
            <div className="p-3 bg-white rounded-md shadow-md">
              <Switch>
                <Route exact path="/">
                  <Form service="bkash" />
                </Route>
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
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
