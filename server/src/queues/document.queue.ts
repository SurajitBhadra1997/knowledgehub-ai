import { Queue } from "bullmq";
import { redis } from "../lib/redis";

export const documentQueue = new Queue("document-processing", {
  connection: redis,
});