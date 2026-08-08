import { fetchJson, cached } from "./external.js";
import { BadRequestError } from "./middleware.js";

// Frankfurter is a free, open-source exchange rate API backed by the
// European Central Bank. No API key, no account, no rate limit.
// Docs: https://frankfurter.dev
// Base URL is configurable via env so it can be swapped (self-hosted
// Frankfurter instance, a different provider, staging vs prod) without
// touching code - see .env.example.
const FRANKFURTER_BASE = process.env.CURRENCY_API_BASE_URL || "https://api.frankfurter.dev/v1";

const RATES_TTL_MS = 60 * 60 * 1000; // 1 hour - ECB publishes once/day anyway
const CURRENCIES_TTL_MS = 24 * 60 * 60 * 1000; // 1 day, this list barely changes

const CODE_RE = /^[A-Za-z]{3}$/;

export function assertValidCode(code, label) {
  if (!code || !CODE_RE.test(code)) {
    throw new BadRequestError(`"${label}" must be a 3-letter currency code, e.g. USD.`);
  }
  return code.toUpperCase();
}

export async function getSupportedCurrencies() {
  const { value } = await cached("currency:list", CURRENCIES_TTL_MS, () =>
    fetchJson(`${FRANKFURTER_BASE}/currencies`)
  );
  return value; // { USD: "United States Dollar", ... }
}

export async function getLatestRates(base) {
  const baseCode = assertValidCode(base, "base");
  const { value } = await cached(`currency:rates:${baseCode}`, RATES_TTL_MS, async () => {
    const data = await fetchJson(`${FRANKFURTER_BASE}/latest?base=${baseCode}`);
    return { base: data.base, date: data.date, rates: { ...data.rates, [data.base]: 1 } };
  });
  return value;
}

export async function convertCurrency({ amount, from, to }) {
  const fromCode = assertValidCode(from, "from");
  const toCode = assertValidCode(to, "to");
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    throw new BadRequestError('"amount" must be a valid number.');
  }

  const { base, date, rates } = await getLatestRates(fromCode);

  if (!(toCode in rates)) {
    throw new BadRequestError(`Unsupported "to" currency: ${toCode}`);
  }

  const rate = rates[toCode];
  const result = numericAmount * rate;

  return {
    amount: numericAmount,
    from: base,
    to: toCode,
    rate,
    result: Math.round(result * 1e6) / 1e6,
    date
  };
}
