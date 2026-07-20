import { documentQueue } from "../queues/document.queue";
import { documentRepository } from "../repositories/document.repository";

class DocumentService {
  async uploadDocument(file: Express.Multer.File, userId: string) {
    const document = await documentRepository.create({
      title: file.originalname,

      fileName: file.filename,

      filePath: file.path,

      mimeType: file.mimetype,

      fileSize: file.size,

      status: "UPLOADED",

      user: {
        connect: {
          id: userId,
        },
      },
    });

    await documentQueue.add("process-document", {
      documentId: document.id,
      filePath: document.filePath,
      mimeType: document.mimeType,
    });
    console.log("✅ Job Added to Queue");
    return document;
  }
  async getDocuments() {
    return documentRepository.findAll();
  }

  async deleteDocuments(id: string) {
    return documentRepository.delete(id);
  }
}

export const documentService = new DocumentService();
