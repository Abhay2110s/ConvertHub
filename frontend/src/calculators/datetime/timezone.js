export default function convertTimezone(date, fromTimeZone, toTimeZone) {
  const options = { timeZone: toTimeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}
