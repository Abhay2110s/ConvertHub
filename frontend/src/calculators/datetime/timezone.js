// Returns how far `timeZone`'s local wall clock is ahead of UTC (in ms)
// at the instant `utcDate` represents.
function getOffsetMs(utcDate, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })
    .formatToParts(utcDate)
    .reduce((acc, { type, value }) => {
      if (type !== "literal") acc[type] = parseInt(value, 10);
      return acc;
    }, {});

  const asUTC = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return asUTC - utcDate.getTime();
}

export default function convertTimezone(dateTime, fromTimeZone, toTimeZone) {
  if (!dateTime) throw new Error("Please provide a valid date and time.");

  const [datePart, timePart = "00:00"] = dateTime.split("T");
  const [year, month, day] = (datePart || "").split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const naiveUtcMs = Date.UTC(year, (month || 1) - 1, day, hour || 0, minute || 0, 0);
  if (Number.isNaN(naiveUtcMs)) throw new Error("Please provide a valid date and time.");

  // The entered wall-clock time is in `fromTimeZone`, not UTC — find that
  // zone's offset at this instant and shift accordingly to get the real
  // UTC instant before formatting it into `toTimeZone`.
  const offsetMs = getOffsetMs(new Date(naiveUtcMs), fromTimeZone);
  const actualUtcMs = naiveUtcMs - offsetMs;
  const actualDate = new Date(actualUtcMs);

  const options = { timeZone: toTimeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  return {
    convertedTime: new Intl.DateTimeFormat("en-US", options).format(actualDate),
    sourceTimeZone: fromTimeZone,
    targetTimeZone: toTimeZone
  };
}
