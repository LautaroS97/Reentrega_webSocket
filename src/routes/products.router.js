import express from 'express';
import productController from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/", productController.index);
productRouter.get("/:pid", productController.show);
productRouter.put("/:pid", productController.update);
productRouter.post("/create", productController.create);
productRouter.delete("/:pid", productController.destroy);

export default productRouter;