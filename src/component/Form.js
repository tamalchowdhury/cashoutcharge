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

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { calculateCharge } from "../calculateCharge";
import { rateInfo } from "../rateInfo";
import { makeCapitalCase } from "../makeCapitalCase";

export default function Form({ service, value, setValue }) {
  let { slug } = useParams();
  const defaultTitle = `${makeCapitalCase(service)} Cashout Charge Calculator`;
  const [title, setTitle] = useState(defaultTitle);
  const inputValue = useRef();
  let history = useHistory();
  let location = useLocation();
  let validValue = parseInt(slug);

  useLayoutEffect(() => {
    let newTitle = "";
    if (value) {
      let [app, ussd] = calculateCharge(service, value);
      let fee = ussd;
      let amount = parseInt(value);
      newTitle = `${amount.toLocaleString("en-IN")} Tk ${makeCapitalCase(
        service
      )} Cashout Charge is ${fee} Tk (Total: ${parseInt(
        amount + fee
      ).toLocaleString("en-IN")})`;
    } else {
      newTitle = defaultTitle;
    }
    if (value) {
      history.push(`/${service}/${value}`);
    }
    setTitle(newTitle);
  }, [value]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    let value = e.target.value;
    if (value.length < 7) {
      setValue(value);
    }
  }

  async function handleShare() {
    const shareData = {
      title,
      text: title,
      url: window.location.href,
    };

    await navigator.share(shareData);
    // .then(() => alert("Shared successfully"))
    // .catch((err) => alert(err));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-md text-gray-800">{title}</h2>
      <p>{rateInfo[service]}</p>
      {/* <h3 className="font-bold">Details</h3>
      <p>💸 With charge</p>
      <p>Without charge</p>
      <p>📱 Using App 1.75%</p>
      <p>#️⃣ Using USSD (button phone) 1.85%</p> */}
      <form onSubmit={handleSubmit} className="text-center">
        <input
          className="border-b-2 p-1 w-6/12  text-2xl"
          type="number"
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
        {/* <button className="h-4 w-4 bg-red-400">&times;</button> */}
      </form>
      <div className="shareBox text-center">
        {navigator.share && (
          <button
            className="bg-gray-500 rounded-md text-white px-3 py-2 my-2 text-center"
            onClick={handleShare}
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
}
