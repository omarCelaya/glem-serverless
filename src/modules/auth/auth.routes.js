import { Router } from "express";
import { loginController } from "./auth.controller.js";
const authRoutes = Router();
// Ruta POST /api/auth/login
authRoutes.post("/login", loginController);
export default authRoutes;
