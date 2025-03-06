import {Response, Request, NextFunction} from 'express'

export const isAdmin = (req:Request, res:Response, next:NextFunction):any => {
    const {role} = req.body.user.role

    console.log(role)
    try{
        if(role === 'admin'){
            next()
        }else{
            res.status(401).json({error:'Access denied, no admin'})
        }
    }catch(error){
        res.status(401).json({error:'Invalid token'})
    }
}