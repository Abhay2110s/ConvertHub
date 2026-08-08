import { withApi, BadRequestError } from "../../lib/middleware.js";
import { convertBetweenTimeZones } from "../../lib/timeService.js";

// GET /api/time/convert?dateTime=2026-08-08T10:00&from=Asia/Kolkata&to=America/New_York
// -> { input, fromTimeZone, toTimeZone, convertedTime, utcInstant }
export default withApi(async (req, res) => {
  const { dateTime, from, to } = req.query;

  if (!dateTime || !from || !to) {
    throw new BadRequestError('"dateTime", "from" and "to" query parameters are all required.');
  }

  const data = convertBetweenTimeZones(dateTime.toString(), from.toString(), to.toString());
  res.setHeader("Cache-Control", "public, max-age=60");
  res.status(200).json(data);
});
