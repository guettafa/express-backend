import express, {Request, Response, NextFunction} from "express";

import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller";
import { Product } from "../models/product";
import { checkAccess, isGestionnaire } from "../middlewares/auth.middleware";
import { logger } from "../utils/logger";
import { isValidProduct } from "../utils/regex";

const router = express.Router();

// GET ALL
router.get("/", checkAccess, async (req: Request, res: Response) => {
    res.json(getProducts());
});

// GET BY ID
router.get("/:id", checkAccess, async (req: Request, res: Response) => {
    const product = getProduct(req.params.id);
    if (!product) {
        res.status(404).json({message: "Product not found"});
    } else {
        res.json(product);
    }
})

// POST
router.post("/", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const product: Product = {...req.body};
    if (isValidProduct(product)) {
        res.json({message: addProduct(product)});
        logger.info(`New product has been added - ${product.title}`);
    } else {
        res.status(500).json({message: "Product couldn't be added"}); 
        logger.error("Product can't be added because it's in the wrong format");
    }
});

// UPDATE
router.put("/:id", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product: Product = {...req.body};
    if (isValidProduct(product)) {
        res.status(200).json({message: updateProduct(productId)});
        logger.info(`Product with id ${productId} has been updated`);
    } else {
        res.status(500).json({message: "Product couldn't be updated"});
        logger.error(`Couldn't update product with id ${productId}`)
    }
})

// DELETE
router.delete("/:id", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        res.status(204).json({message: deleteProduct(productId)});
        logger.info(`Product with id ${productId} has been deleted`);
    } catch (error) {
        res.status(404).json({message: `Product not found - ${error}`});
        logger.error(`Couldn't delete product with id ${productId}`);
    }
})

export default router;
