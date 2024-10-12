import express, {Request, Response, NextFunction} from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller";
import { Product } from "../models/product";

const router = express.Router();

// GET
router.get("/", async (req: Request, res: Response) => {
    res.json(getProducts());
});

// GET BY ID
router.get("/:id", async (req: Request, res: Response) => {
    const product = getProduct(req.params.id);
    if (!product) {
        res.status(404).json({message: "Product not found"});
    } else {
        res.json(product);
    }
})

// POST
router.post("/", async (req: Request, res: Response) => {
    const product: Product = {...req.body};
    try {
       res.json({message: addProduct(product)});
    } catch (error) {
       res.status(500).json({message: error}); 
    }
});

// UPDATE by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        res.json({message: updateProduct(req.params.id)});
    } catch (error) {
        res.status(500).json({message: error});
    }
})

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        res.json({message: deleteProduct(req.params.id)});
    } catch (error) {
        res.status(404).json({message: `Product not found - ${error}`});
    }
})

export default router;
