export function formatNumber(value, precision = 6) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "0";
  if (value === 0) return "0";

  const abs = Math.abs(value);

  // Extremely small (e.g. converting 1 nanometer -> meter) or extremely
  // large results lose all meaning when forced through a fixed number of
  // decimal places, so fall back to scientific notation instead of
  // silently rounding them to 0.
  if (abs < 1e-6 || abs >= 1e15) {
    return value.toExponential(6).replace("+", "");
  }

  // For values smaller than 1, a flat `precision` can still truncate
  // meaningful digits (0.0000001234 at precision 6 would round to 0).
  // Extend the allowed decimals to cover the leading zeros first.
  let maximumFractionDigits = precision;
  if (abs < 1) {
    const leadingZeros = Math.max(0, -Math.floor(Math.log10(abs)) - 1);
    maximumFractionDigits = Math.min(20, precision + leadingZeros);
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits
  });
}

export function formatCurrency(value, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(value);
}

export function formatPercentage(value) {
  return `${value.toFixed(2)}%`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US").format(new Date(date));
}

export function truncate(str, length = 50) {
  if (!str) return "";
  return str.length > length ? `${str.slice(0, length)}...` : str;
}
