import { AuthService } from "@/services/auth.services";
import { Response, Request, NextFunction } from "express-serve-static-core";
import jwt from "jsonwebtoken";

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "default_secret";

export class AuthController {
  static async register(req: Request, res: Response) {
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
        const userData = req.body
        console.log('looo',userData.email, userData.password)
        const { token, user } = await AuthService.login(userData.email, userData.password)
        //TODO inyectar cookie al cliente
        console.log(token, user)

        const validSameSiteValues = ["none", "lax", "strict"] as const; // Valores permitidos

        const sameSiteValue: "none" | "lax" | "strict" = validSameSiteValues.includes(process.env.COOKIE_SAME_SITE as "none" | "lax" | "strict")
        ? (process.env.COOKIE_SAME_SITE as "none" | "lax" | "strict")
        : "none"; // Si no es válido, usa "none" por defecto


        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 3, // 3 horas de caducidad
            httpOnly: true, // no se puede accerder mediante js
            secure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : true,// solo se envia si usas https
            sameSite: sameSiteValue, // Evita ataques CSRF

        })
        res.status(201).json({ message: 'Login successfully:', token })
    } catch (error) {
        next(error)
    }
}

  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout successfully:' });
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

