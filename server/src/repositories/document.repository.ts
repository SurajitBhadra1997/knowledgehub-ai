import prisma from "../lib/prisma";
import { Document, DocumentStatus, Prisma } from "@prisma/client";
class DocumentRepository {
  async create(data: Prisma.DocumentCreateInput): Promise<Document> {
    return prisma.document.create({
      data,
    });
  }

  async findAll(): Promise<Document[]> {
    return prisma.document.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByID(id: string): Promise<Document | null> {
    return prisma.document.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return prisma.document.delete({
      where: {
        id,
      },
    });
  }

  async updateStatus(id: string, status: DocumentStatus) {
    return prisma.document.update({
      where: { id },
      data: { status },
    });
  }
  
  async saveExtractedText(id: string, text: string) {
    return prisma.document.update({
      where: { id },
      data: {
        extractedText: text,
        status: "READY",
      },
    });
  }
  
  async findById(id: string) {
    return prisma.document.findUnique({
      where: { id },
    });
  }
}

export const documentRepository = new DocumentRepository();
