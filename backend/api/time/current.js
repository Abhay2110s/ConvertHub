import { withApi } from "../../lib/middleware.js";
import { getCurrentTime } from "../../lib/timeService.js";

// GET /api/time/current?timezone=Asia/Kolkata
// -> { timezone, datetime, utc_datetime, unixtime, utc_offset, abbreviation, dst, source }
export default withApi(async (req, res) => {
  const timezone = (req.query.timezone || "UTC").toString();
  const data = await getCurrentTime(timezone);
  res.setHeader("Cache-Control", "public, max-age=1, stale-while-revalidate=5");
  res.status(200).json(data);
});
