import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Provider } from "@prisma/client";

//TODO problema, mejor usar el patrón singleton

export class ProviderService {
  static async getAll() {
    return prisma.provider.findMany();
  }

  static async getById(id: number) {
    const findOffert = await prisma.provider.findUnique({ where: { Provid: id } });
    if (!findOffert) throw new HttpException(404, "provider doesn't exist");

    return findOffert;
  }

  static async create(provider: Provider) {
    try{
      return await prisma.provider.create({
        data: {
          ...provider,
        },
      });
    }catch(error){
        throw new HttpException(401, "Error creating provider");
      }
  }

  static async update(id: number, provider: Provider) {
    try {
      return await prisma.provider.update({
        where: { Provid: id },
        data: { ...provider },
      });
    } catch (error) {
      throw new HttpException(404, "provider not found");
    }
  }

    static async ProviderExists(providerId: number): Promise<boolean> {
        const provider = await prisma.provider.findUnique({
            where: { Provid: providerId },
        });
        return provider !== null;
    }

  static async delete(id: number) {
    try {
      return await prisma.provider.delete({ where: { Provid:id } });
    } catch (error) {
      throw new HttpException(404, "provider not found");
    }
  }
}