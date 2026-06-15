import { Router, type IRouter } from "express";
import { mongoose } from "../db";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? "connected" : "disconnected";

  res.json({
    status: "ok",
    db: dbStatus,
  });
});

export default router;
