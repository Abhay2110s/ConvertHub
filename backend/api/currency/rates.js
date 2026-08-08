import { withApi } from "../../lib/middleware.js";
import { getLatestRates } from "../../lib/currencyService.js";

// GET /api/currency/rates?base=USD
// -> { base: "USD", date: "2026-08-07", rates: { EUR: 0.92, INR: 87.1, ... } }
export default withApi(async (req, res) => {
  const base = (req.query.base || "USD").toString();
  const data = await getLatestRates(base);
  res.setHeader("Cache-Control", "public, max-age=1800, stale-while-revalidate=3600");
  res.status(200).json(data);
});
