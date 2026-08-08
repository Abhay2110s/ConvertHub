import { apiGet } from "../../api/client";

// Converts `amount` from `fromCurrency` to `toCurrency` using live
// exchange rates from the ConvertHub backend (financeEngine already
// calls this asynchronously, same as every other finance calculator).
// Only `result` and `rate` are surfaced to the UI - the backend also
// returns the ECB rate date, but the calculator page doesn't show it.
export default async function convertCurrency(amount, fromCurrency, toCurrency) {
  const data = await apiGet("currency/convert", { amount, from: fromCurrency, to: toCurrency });
  return { result: data.result, rate: data.rate };
}
