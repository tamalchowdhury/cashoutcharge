import { Link } from "react-router-dom"
import BkashLogo from "../../images/bkash.webp"
import NagadLogo from "../../images/nagad.webp"
import UpayLogo from "../../images/upay.webp"
import RocketLogo from "../../images/rocket.png"

export default function Home({ text }) {
  return (
    <>
      <div className="shell">
        <p>
          Cashout Charge for Bkash, Nagad, Rocket, and Upay mobile financial
          services in Bangladesh
        </p>
        <div className="form home__icons">
          <Link to="/bkash">
            <img src={BkashLogo} alt="Bkash Logo" />
            <h1>Bkash</h1>
          </Link>
          <Link to="/nagad">
            <img src={NagadLogo} alt="Nagad Logo" />
            <h1>Nagad</h1>
          </Link>
          <Link to="/rocket">
            <img src={RocketLogo} alt="Rocket Logo" />
            <h1>Rocket</h1>
          </Link>
          <Link to="/upay">
            <img src={UpayLogo} alt="Upay Logo" />
            <h1>Upay</h1>
          </Link>
        </div>
      </div>
    </>
  )
}
