import { documentService } from "../services/document.service";
import { Request, Response, NextFunction } from "express";
class DocumentController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new Error("File missing");
      }
      const userId = (req as any).user.userId;

      const document = await documentService.uploadDocument(req.file, userId);

      res.status(201).json({
        success: true,
        data: document,
      });
    } catch (err) {
      next(err);
    }
  }
  async getDocumentList(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await documentService.getDocuments();
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const documentController = new DocumentController();
