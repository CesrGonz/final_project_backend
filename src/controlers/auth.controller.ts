import { AuthService } from "@/services/auth.services";
import { Response, Request, NextFunction } from "express-serve-static-core";
import jwt from "jsonwebtoken";

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "default_secret";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      console.log(userData);
      const token = await AuthService.register(userData);

      // Configurar la cookie antes de enviar la respuesta
      res.cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
      });

      // Enviar la respuesta
        res.status(201).json({ message: "User register successfully", token });
    } catch (error) {
        res.status(409).json({ message: "Failed to register user " + error });
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      console.log('looo', userData.email, userData.password);
      const { token, user } = await AuthService.login(userData.email, userData.password);
      console.log(token, user);

      const validSameSiteValues = ["none", "lax", "strict"] as const;
      const sameSiteValue: "none" | "lax" | "strict" = validSameSiteValues.includes(process.env.COOKIE_SAME_SITE as "none" | "lax" | "strict")
        ? (process.env.COOKIE_SAME_SITE as "none" | "lax" | "strict")
        : "none";

      // Configurar la cookie antes de enviar la respuesta
      res.cookie('token', token, {
        maxAge: 60 * 60 * 1000 * 3,
        httpOnly: true,
        secure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : true,
        sameSite: sameSiteValue,
      });

      // Enviar la respuesta
     res.status(200).json({ message: 'Login successfully:', user });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('token');
      return res.status(204).json({ message: 'Logout successfully:' });
    } catch (error) {
      next(error);
    }
  }

  static async getAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "No autenticado" });

      const decoded = jwt.verify(token, TOKEN_PASSWORD);
      return res.status(200).json(decoded);
    } catch (error) {
      next(error);
    }
  }
}

