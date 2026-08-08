import { fetchJson, UpstreamError } from "./http.js";
import { cached } from "./cache.js";
import { BadRequestError } from "./handler.js";

// Time.now's World Time API: free, no API key, CORS enabled.
// Docs: https://time.now/developer
// Base URL is configurable via env so it can be swapped without touching
// code - see .env.example.
const TIME_API_BASE = process.env.TIME_API_BASE_URL || "https://time.now/developer/api";

const TIMEZONES_TTL_MS = 24 * 60 * 60 * 1000; // 1 day
const CURRENT_TIME_TTL_MS = 5 * 1000; // keep it near-live, just smooths bursts

function isKnownTimeZone(tz) {
  try {
    Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export function assertValidTimeZone(tz) {
  if (!tz || typeof tz !== "string" || !isKnownTimeZone(tz)) {
    throw new BadRequestError(
      `"timezone" must be a valid IANA time zone, e.g. Asia/Kolkata or America/New_York.`
    );
  }
  return tz;
}

// Computes the same shape of data the external API returns, using
// Node's built-in Intl/tz database. Used as a fallback if the
// upstream API is unreachable, so the endpoint stays useful even
// when the third party is down.
function computeLocalTime(timeZone) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "shortOffset"
  })
    .formatToParts(now)
    .reduce((acc, { type, value }) => {
      acc[type] = value;
      return acc;
    }, {});

  const offsetRaw = (parts.timeZoneName || "GMT+0").replace("GMT", "") || "+0";
  const [offH, offM = "0"] = offsetRaw.split(":");
  const offsetHours = parseInt(offH, 10) || 0;
  const offsetMinutes = Math.sign(offsetHours || 1) * parseInt(offM, 10);
  const utcOffset = `${offsetHours >= 0 ? "+" : "-"}${String(Math.abs(offsetHours)).padStart(2, "0")}:${String(
    Math.abs(offsetMinutes)
  ).padStart(2, "0")}`;

  const abbreviation = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
    .formatToParts(now)
    .find((p) => p.type === "timeZoneName")?.value;

  const localIso = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${utcOffset}`;

  return {
    timezone: timeZone,
    datetime: localIso,
    utc_datetime: now.toISOString(),
    unixtime: Math.floor(now.getTime() / 1000),
    utc_offset: utcOffset,
    abbreviation: abbreviation || utcOffset,
    dst: null,
    source: "server-fallback"
  };
}

export async function getCurrentTime(timeZone) {
  const tz = assertValidTimeZone(timeZone);

  const { value } = await cached(`time:current:${tz}`, CURRENT_TIME_TTL_MS, async () => {
    try {
      const data = await fetchJson(`${TIME_API_BASE}/timezone/${tz}`, { timeoutMs: 5000 });
      return {
        timezone: data.timezone,
        datetime: data.datetime,
        utc_datetime: data.utc_datetime,
        unixtime: data.unixtime,
        utc_offset: data.utc_offset,
        abbreviation: data.abbreviation,
        dst: data.dst,
        source: "time.now"
      };
    } catch (err) {
      if (err instanceof UpstreamError) {
        // Upstream flaky/down - fall back to a locally computed result
        // rather than failing the request outright.
        return computeLocalTime(tz);
      }
      throw err;
    }
  });

  return value;
}

export async function getAllTimeZones() {
  const { value } = await cached("time:zones", TIMEZONES_TTL_MS, async () => {
    try {
      return await fetchJson(`${TIME_API_BASE}/timezone`, { timeoutMs: 5000 });
    } catch {
      // Fallback to the runtime's own IANA database.
      return typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : [];
    }
  });
  return value;
}

// Deterministic timezone conversion using the IANA tz database built
// into the Node.js runtime - this doesn't need a third-party call
// (and stays correct even if one is down), it's the same approach
// used by the frontend's own date engine.
export function convertBetweenTimeZones(dateTime, fromTimeZone, toTimeZone) {
  assertValidTimeZone(fromTimeZone);
  assertValidTimeZone(toTimeZone);

  if (!dateTime || typeof dateTime !== "string") {
    throw new BadRequestError('"dateTime" is required, e.g. 2026-08-08T10:00.');
  }

  const [datePart, timePart = "00:00"] = dateTime.split("T");
  const [year, month, day] = (datePart || "").split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const naiveUtcMs = Date.UTC(year, (month || 1) - 1, day, hour || 0, minute || 0, 0);
  if (Number.isNaN(naiveUtcMs)) {
    throw new BadRequestError('"dateTime" must be a valid date/time, e.g. 2026-08-08T10:00.');
  }

  const getOffsetMs = (utcDate, timeZone) => {
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
  };

  const offsetMs = getOffsetMs(new Date(naiveUtcMs), fromTimeZone);
  const actualDate = new Date(naiveUtcMs - offsetMs);

  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: toTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(actualDate);

  return {
    input: dateTime,
    fromTimeZone,
    toTimeZone,
    convertedTime: formatted,
    utcInstant: actualDate.toISOString()
  };
}
