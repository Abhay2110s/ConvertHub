import { withApi } from "../../lib/middleware.js";
import { getSupportedCurrencies } from "../../lib/currencyService.js";

// GET /api/currency/currencies
// -> { USD: "United States Dollar", EUR: "Euro", ... }
export default withApi(async (req, res) => {
  const currencies = await getSupportedCurrencies();
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.status(200).json({ currencies });
});
