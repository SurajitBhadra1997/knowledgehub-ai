import { Worker } from "bullmq";
import { redis } from "../lib/redis";
import { documentRepository } from "../repositories/document.repository";
import { extractPdfText } from "../processors/pdf.processor";
import { extractDocxText } from "../processors/docx.processor";
import { extractTxtText } from "../processors/txt.processor";

const worker=new Worker(
  "document-processing",
  async (job) => {
    console.log("job",job)
    const { documentId, filePath, mimeType } = job.data;

    console.log("Processing:", documentId);

    await documentRepository.updateStatus(
      documentId,
      "PROCESSING"
    );

    let text = "";

    console.log("mimeType",mimeType)

    switch (mimeType) {
      case "application/pdf":
        throw new Error("PDF processing not implemented yet");

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        text = await extractDocxText(filePath);
        break;

      case "text/plain":
        text = await extractTxtText(filePath);
        break;

      default:
        throw new Error("Unsupported file");
    }

    console.log("text",text)

    await documentRepository.saveExtractedText(
      documentId,
      text
    );

    console.log("READY:", documentId);
  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job?.id} failed`);
  console.error(err);
});

worker.on("error", (err) => {
  console.error("Worker Error:", err);
});