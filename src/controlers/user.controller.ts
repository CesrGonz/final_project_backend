import { UserService } from "@/services/user.services"
import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken";

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass';

export class UserController{

    static async profile(req:Request, res:Response){

        const email = req.body.user.email
        const user = await UserService.getByEmail(email)
        res.status(200).json(user)
    }

    static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await UserService.getAll();
            const token = jwt.sign({ users }, TOKEN_PASSWORD, { expiresIn: '1h' });
            res.status(200).json({ token,users });
          } catch (error) {
            next(error);
          }
      }
}