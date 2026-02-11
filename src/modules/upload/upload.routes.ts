import { Router } from "express";
import { UploadService } from "./upload.service.js";

const uploadRouter = Router();

uploadRouter.post("/product-image", UploadService.uploadProductImage);

export default uploadRouter;
