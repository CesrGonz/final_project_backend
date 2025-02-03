import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();
const tokenPassowrd = process.env.TOKEN_PASSWORD || 'pass'

export class AuthService {
    static async register (user:User){
        const findUser = await prisma.user.findUnique({where : {email: user.email}})
        if(findUser) throw new Error (`user ${user.email} already exists`)

        const passwordEncripted = await bcrypt.hash(user.password, 10)
        user.password=''

        return await prisma.user.create({
            data:{
                ...user,
                password: passwordEncripted,
                role: null,
            },
            omit:{
                password : true
            }
        })
    }


    static async login(email:string, password:string){
          // ver si el usuario existe
        const findUser = await prisma.user.findUnique({where:{email}})
        if(!findUser) throw new Error("invalid user or password")
         //ver si el pasword coincide 
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect) throw new Error("Invalid user or password")
        console.log("usuario encontrado: "+ findUser.email + "su rol es admin? : "+ findUser.role)
        
        //generar token de autenticacion
        const token = jwt.sign({colorFav:"azul", id:findUser.id, email:findUser.email, role:findUser.role},
            tokenPassowrd,{expiresIn:"1h"}) 
        //devolver token
        return token
    }
}