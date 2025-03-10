import { Response, Request, NextFunction } from 'express'
import jwt from "jsonwebtoken"

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export const isAuthenticated = (req:Request, res:Response, next:NextFunction):any => {

    //const token = req.headers.authorization?.split(" ")[1]
    const token = req.cookies.token
    if(!token) return res.status(401).json({error: 'Access denied'})
    
    //Comprobar si el token es valido para que nadie pueda inventarse uno
    try {
        const tokenDecodificado = jwt.verify(token, TOKEN_PASSWORD)
        req.body.user = tokenDecodificado
        next()
    } catch (error) {
        res.status(401).json({error: 'Invalid token'})
    }
    
}