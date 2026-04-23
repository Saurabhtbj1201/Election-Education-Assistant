import cors from "cors";
import dotenv from "dotenv";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import { apiRateLimit } from "./middleware/rate-limit.js";
import { chatRouter } from "./routes/chat.js";
import { glossaryRouter } from "./routes/glossary.js";
import { processRouter } from "./routes/process.js";
import { timelineRouter } from "./routes/timeline.js";

dotenv.config();

export const app = express();

const configuredOrigins = (process.env.FRONTEND_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: configuredOrigins.length > 0 ? configuredOrigins : true
  })
);
app.use(express.json({ limit: "128kb" }));
app.use(apiRateLimit);

app.get("/healthz", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/timeline", timelineRouter);
app.use("/api/process", processRouter);
app.use("/api/glossary", glossaryRouter);
app.use("/api/chat", chatRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = error instanceof Error ? error.message : "Unexpected server error";
  res.status(500).json({ error: message });
});

const port = Number.parseInt(process.env.PORT ?? "8080", 10);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}
