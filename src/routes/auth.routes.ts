import { Router } from "express";
import { AuthController } from "../controlers/auth.controller";
import { ValidationMiddleware } from "@/middlewares/validation.middlewares";
import { loginValidation, registerValidation } from "@/middlewares/validators.middlewares";

const router = Router();

router.post('/login', loginValidation, ValidationMiddleware, AuthController.login)
router.post('/register', registerValidation, ValidationMiddleware, AuthController.register)

export default router;