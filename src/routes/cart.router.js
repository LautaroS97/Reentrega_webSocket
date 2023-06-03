import express from 'express';
import CartManager from '../managers/cartManager.js';
import cartController from '../controllers/cartController.js';

const cartRouter = express.Router();
const cartManager = new CartManager();

cartRouter.post("/", cartController.create);
cartRouter.get("/:cid", cartController.show);
cartRouter.post("/:cid/product/:pid", cartController.add);

export default cartRouter;