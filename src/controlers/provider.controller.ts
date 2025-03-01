import { Request, Response, NextFunction } from "express";
import { ProviderService } from "@/services/provider.services";
import { HttpException } from "../exceptions/httpException";

export class ProviderController {

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const providerData = req.body;
      const newProvider = await ProviderService.create(providerData);
        res.status(201).json(newProvider);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      }
      next(new HttpException(500, "Internal Server Error"));
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const providers = await ProviderService.getAll();
      res.status(200).json(providers);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      }
      next(new HttpException(500, "Internal Server Error"));
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const provider = await ProviderService.getById(id);
      if (!provider) {
        throw new HttpException(404, "Provider not found");
      }
      res.status(200).json(provider);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(new HttpException(500, "Internal Server Error"));
      }
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const providerData = req.body;
      const updatedProvider = await ProviderService.update(id, providerData);
      res.status(200).json(updatedProvider);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      }
      next(new HttpException(500, "Internal Server Error"));
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await ProviderService.delete(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      }
      next(new HttpException(500, "Internal Server Error"));
    }
  }
}