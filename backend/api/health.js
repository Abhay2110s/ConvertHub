import { withApi } from "../lib/middleware.js";

export default withApi(async (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "converthub-backend",
    timestamp: new Date().toISOString()
  });
});
