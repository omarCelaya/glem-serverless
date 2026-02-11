import { Request, Response } from "express";
import { ProductsService } from "./products.service.js";
// import * as service from "./products.service";

export async function getPublicProducts(req: Request, res: Response) {
  try {
    const data = await ProductsService.getPublicProducts();
    res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await ProductsService.createProduct(req.body);
    res.json(product);
  } catch (e) {
    res.status(500).json(e);
  }
}