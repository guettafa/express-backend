import express, {Request, Response, NextFunction} from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller";
import { Product } from "../models/product";
import { checkAccess, isGestionnaire } from "../middlewares/auth.middleware";
import { logger } from "../utils/logger";

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
    try {
        logger.alert(`New product has been added - ${product.title}`);
        res.json({message: addProduct(product)});
    } catch (error) {
        res.status(500).json({message: error}); 
    }
});

// UPDATE
router.put("/:id", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        logger.alert(`Product with id ${productId} has been updated`);
        res.status(200).json({message: updateProduct(productId)});
    } catch (error) {
        logger.error(`Couldn't update product with id ${productId}`)
        res.status(500).json({message: error});
    }
})

// DELETE
router.delete("/:id", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        logger.alert(`Product with id ${productId} has been deleted`);
        res.status(204).json({message: deleteProduct(productId)});
    } catch (error) {
        logger.error(`Couldn't delete product with id ${productId}`);
        res.status(404).json({message: `Product not found - ${error}`});
    }
})

export default router;
