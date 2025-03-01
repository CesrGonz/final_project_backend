import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Product, PrismaClient, Provider } from "@prisma/client";
//const prisma = new PrismaClient()

export class ProductService {
  static async getById(id: number) {
    const findOffer = await prisma.product.findUnique({ where: { id } });
    if (!findOffer) throw new HttpException(404, "product not found");
    return findOffer;
  }

  // localhost:3000/api/offer/?title=dam
  static async getAll(title: string = "") {
    /*  return await prisma.offer.findMany({
            where: title ? {
                title: {
                    contains: title
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        }) */

    return await prisma.product.findMany({
      where: {
        ...(title && {
          title: {
            contains: title,
            //mode: "insensitive" // Búsqueda sin distinción entre mayúsculas y minúsculas
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });
  }

  static async create(productData: Product, idProvider: number) {
    try {
      // Verificar si el proveedor existe
      const providerExists = await prisma.provider.findUnique({
        where: { Provid: productData.idProvider },
      });
      if (!providerExists) {
        throw new HttpException(404, "Provider not found");
      }

      // Crear el producto
      return await prisma.product.create({
        data: {
          ...productData,
          provider : idProvider
        },
      });
    } catch (error) {
      throw new HttpException(400, "Error creating product");
    }
  }

  static async update(id: number, product: Product) {
    const findOffer = await prisma.product.findUnique({ where: { id } });
    if (!findOffer) throw new HttpException(404, "Product doesnt exists");
    return await prisma.product.update({
      where: { id },
      data: {
        ...product,
      },
    });
  }

  static async delete(id: number) {
    try {
      return await prisma.product.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(404, "Product not found");
    }
  }
  
}