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
    document.title = title;
  }, [value]);

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
      <form onSubmit={handleSubmit}>
        <input
          className="border-b-2 p-1 w-full text-lg"
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
      </form>
      <div className="shareBox">
        {navigator.share && <button onClick={handleShare}>Share</button>}
      </div>
    </div>
  );
}
