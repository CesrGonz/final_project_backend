import { AuthService } from "@/services/auth.services"
import { Response, Request } from "express-serve-static-core"

export class AuthController{
    
        static async register(req:Request, res:Response){
            try{
                const userData = req.body
                console.log(userData)
                const token = await AuthService.register(userData)
                res.status(201).json({message: "User register succesfully", token})
                res.cookie("token",token,{
                    maxAge:60*60*1000,
                    httpOnly: true,
                    secure:false,
                    sameSite:'strict'
                })
            }catch(error){
                res.status(409).json({message: "fallo al registrar el usuario"+error})
            }
        }

        static async login(req:Request, res:Response){
            try{
                const userData = req.body
                console.log(userData)
                const token = await AuthService.login(userData.email, userData.password)
                //TODO Inyectar una cookie
                res.status(201).json({message: "User register succesfully", token})
            }catch(error){
                res.status(409).json({message: "fallo al registrar el usuario"})
            }
        }
}

