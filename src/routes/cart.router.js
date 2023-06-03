import express from 'express';
import cartController from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post("/", cartController.create);
cartRouter.get("/:cid", cartController.show);
cartRouter.post("/:cid/product/:pid", cartController.add);

export default cartRouter;