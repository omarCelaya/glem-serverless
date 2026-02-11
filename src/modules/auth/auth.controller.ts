import { Request, Response } from "express";
import { loginService } from "./auth.service.js";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y password son requeridos" });
  }

  try {
    const payload = { email, password }
    const data = await loginService(payload);
    res.json(data);
  } catch (e) {
    res.status(401).json({
      error: "Invalid credentials",
      message: e instanceof Error ? e.message : "Unknown error"
    });
  }
};
