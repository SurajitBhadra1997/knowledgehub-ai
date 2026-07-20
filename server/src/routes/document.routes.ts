import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { documentController } from "../controllers/document.controller";
import { authenticate } from "../middleware/auth.middleware";

const documentRoutes = Router();

documentRoutes.post(
  "/upload",
  authenticate,
  upload.single("file"),
  (req, res, next) =>
    documentController.upload(req, res, next)
);

documentRoutes.get(
  "/",
  authenticate,
  (req, res, next) =>
    documentController.getDocumentList(req, res, next)
);

export default documentRoutes;