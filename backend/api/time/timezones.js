import { withApi } from "../../lib/handler.js";
import { getAllTimeZones } from "../../lib/timeService.js";

// GET /api/time/timezones
// -> { timezones: ["Africa/Abidjan", "Africa/Accra", ...] }
export default withApi(async (req, res) => {
  const timezones = await getAllTimeZones();
  res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=86400");
  res.status(200).json({ timezones });
});
