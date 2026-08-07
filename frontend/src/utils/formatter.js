export function formatNumber(value, precision = 6) {
  if (typeof value !== "number" || isNaN(value)) return "0";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision
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
