export default function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
}
