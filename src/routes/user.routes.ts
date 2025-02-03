import { Router } from "express";
import { UserController } from "../controlers/user.controller";
import {isAuthenticated} from "@middlewares/auth.middlewares"

const router = Router()

"api/users/"
router.get('/profile', isAuthenticated ,UserController.profile)
router.get('/', isAuthenticated ,UserController.profile)

export default router