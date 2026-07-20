import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authenticate:RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    (req as any).user = payload;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }
};

