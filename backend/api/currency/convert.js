import { withApi, BadRequestError } from "../../lib/middleware.js";
import { convertCurrency } from "../../lib/currencyService.js";

// GET /api/currency/convert?amount=100&from=USD&to=INR
// -> { amount: 100, from: "USD", to: "INR", rate: 87.1, result: 8710, date: "2026-08-07" }
export default withApi(async (req, res) => {
  const { amount, from, to } = req.query;

  if (amount === undefined || from === undefined || to === undefined) {
    throw new BadRequestError('"amount", "from" and "to" query parameters are all required.');
  }

  const data = await convertCurrency({
    amount: Array.isArray(amount) ? amount[0] : amount,
    from: Array.isArray(from) ? from[0] : from,
    to: Array.isArray(to) ? to[0] : to
  });

  res.setHeader("Cache-Control", "public, max-age=1800, stale-while-revalidate=3600");
  res.status(200).json(data);
});
