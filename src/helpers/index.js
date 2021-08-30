import { calculateCharge } from "./calculateCharge";
import { makeCapitalCase } from "./makeCapitalCase";
import { rateInfo } from "./rateInfo";

const providers = ["bkash", "rocket", "nagad", "upay"];
const popularAmounts = [2000, 5000, 10000, 15000, 25000];

export {
  calculateCharge,
  makeCapitalCase,
  rateInfo,
  popularAmounts,
  providers,
};
