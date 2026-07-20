// Responsible for:

// ✓ Express instance

// ✓ Middlewares

// ✓ Routes

// ✓ Error Handler

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import documentRoutes from "./routes/document.routes";
import { redis } from "./lib/redis";
import { serverAdapter } from "./config/bullboard";
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KnowledgeHub API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

app.use("/admin/queues", serverAdapter.getRouter());

app.use("/api/auth",authRoutes)
app.use("/api/documents",documentRoutes)

// Global error handler (always last)
app.use(errorHandler)

export default app;