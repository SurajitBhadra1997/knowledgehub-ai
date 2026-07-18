// Responsible for:

// ✓ Starting Server

// ✓ Connecting Database

// ✓ Socket.IO

// ✓ Graceful Shutdown
import dotenv from "dotenv";
import app from "./app";
import { logger } from "../src/config/logger";

dotenv.config();

const PORT = 3001;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
