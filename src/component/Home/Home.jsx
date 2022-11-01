import { Link } from "react-router-dom"

export default function Home({ text }) {
  return (
    <>
      <div className="shell">
        <div className="form">
          <p>
            Cashout Charge for Bkash, Nagad, Rocket mobile financial services in
            Bangladesh
          </p>
          <h1>
            <Link to="/bkash">Bkash</Link>
          </h1>
          <h1>
            <Link to="/nagad">Nagad</Link>
          </h1>
          <h1>
            <Link to="/rocket">Rocket</Link>
          </h1>
          {/* <h1>
            <Link to="/upay">Upay</Link>
          </h1> */}
        </div>
      </div>
    </>
  )
}
