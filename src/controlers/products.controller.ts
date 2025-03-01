import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpException"; 
import { ProductService } from "@/services/product.services";



export class ProductController{


    static async getById(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid product ID");

            // pasar a entero
            const offer = await ProductService.getById(id)
            res.status(200).json(offer)
        }catch(error){
            next(error)
        }
    }

    static async getAll(req:Request, res:Response, next: NextFunction){
        try{
            //localhost:3000/offer?title=XXXXXX
            const { title } = req.query;
            const user = await ProductService.getAll(title as string)
            res.status(200).json(user)
        }catch(error){
            next(error)
        }
    }

    static async create(req:Request, res:Response, next: NextFunction){
        try{
            const ProductData = req.body
            const providerId = ProductData.idProvider
            if (!providerId) throw new HttpException(400, "Provider ID is required");
            const newProduct = await  ProductService.create(ProductData, providerId)
            res.status(200).json(newProduct)
        }catch(error){
            next(error)
        }
    }
    static async update(req:Request, res:Response, next: NextFunction){
        try{
            const offerData = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const updatedProduct = await  ProductService.update(id, offerData)
            res.status(200).json(updatedProduct)
        }catch(error){
            next(error)
        }
    }

    static async delete(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const deletedOffer = await  ProductService.delete(id)
            res.status(200).json(deletedOffer)
        }catch(error){
            next(error)
        }
    }
}