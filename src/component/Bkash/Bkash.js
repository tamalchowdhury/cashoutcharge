export default function Bkash({ switchLang }) {
  return (
    <>
      <div className="form">
        <div className="form__title">
          <h1>
            {switchLang(
              "Bkash Cashout Calculator",
              "বিকাশ ক্যাশআউট ক্যালকুলেটর"
            )}
          </h1>
        </div>
      </div>
    </>
  )
}
