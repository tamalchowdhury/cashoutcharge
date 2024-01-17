export function calculateCharge(service, amount) {
  switch (service) {
    case "bkash":
      return calcBkash(amount)
    case "nagad":
      return calcNagad(amount)
    case "rocket":
      return calcRocket(amount)
    case "upay":
      return calcUpay(amount)
    default:
      return [0, 0]
  }
}

function calcBkash(amount) {
  let app = Math.ceil((amount * 1.85) / 100)
  let ussd = Math.ceil((amount * 1.85) / 100)
  return [app, ussd]
}

function calcNagad(amount) {
  let app = Math.ceil((amount * 1.25) / 100)
  let ussd = Math.ceil((amount * 1.5) / 100)
  return [app, ussd]
}

function calcRocket(amount) {
  let app = Math.ceil((amount * 1.8) / 100)
  let ussd = Math.ceil((amount * 1.8) / 100)
  return [app, ussd]
}

function calcUpay(amount) {
  let app = Math.ceil((amount * 1.4) / 100)
  let ussd = Math.ceil((amount * 1.4) / 100)
  return [app, ussd]
}
