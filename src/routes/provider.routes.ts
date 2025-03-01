import { Router } from "express";
import { ProviderController } from "../controlers/provider.controller";
import { isAuthenticated } from "@/middlewares/auth.middlewares";
import { isAdmin } from "@/middlewares/isAdmin.middlewares";

const router = Router();

// Ruta para crear un proveedor
router.post("/", ProviderController.create);

// Ruta para obtener todos los proveedores
router.get("/", isAuthenticated,ProviderController.getAll);

// Ruta para obtener un proveedor por ID
router.get("/:id",isAuthenticated, ProviderController.getById);

// Ruta para actualizar un proveedor
router.put("/:id",isAuthenticated, ProviderController.update);

// Ruta para eliminar un proveedor
router.delete("/:id",isAuthenticated, ProviderController.delete);

export default router;