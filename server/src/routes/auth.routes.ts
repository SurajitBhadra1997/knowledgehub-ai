import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { validate } from "../middleware/validate.middleware";

const authRoutes = Router();

authRoutes.post(
  "/register",
  validate(registerSchema),
  (req, res, next) =>{
    authController.register(req, res, next)
  } 
);

authRoutes.post(
  "/login",
  validate(loginSchema),
  (req, res, next) => authController.login(req, res, next)
);

export default authRoutes;
