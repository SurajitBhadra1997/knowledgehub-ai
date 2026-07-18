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

export default app;