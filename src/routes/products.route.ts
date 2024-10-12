import express, {Request, Response, NextFunction} from "express";

import { Product } from "../models/product";
import fs from "fs";

const router = express.Router();
const PATH_JSON_PRODUCTS = "./src/data/products.json";

// Read from products.json
let products: Product[] = JSON.parse(fs.readFileSync(PATH_JSON_PRODUCTS).toString());
 
// GET
router.get("/", async (req: Request, res: Response) => {
    res.send(products);
});

// GET BY ID
router.get("/:id", async (req: Request, res: Response) => {
    const product: Product = products.find(p => p.id.toString() === req.params.id)!; 
    if (!product) {
        res.status(404).json({message: "Product not found"});
    } else {
        res.json(product);
    }
})

// POST
router.post("/", async (req: Request, res: Response) => {
    const product: Product = {...req.body};
    if (!product) {
        res.status(500).json({message: "Product cannot be created"});
    } else {
        products.push(product); // Add item to array of products
        fs.writeFileSync(PATH_JSON_PRODUCTS, JSON.stringify(products));    
        res.json({message: "Product added successfully"});
    }
});

// UPDATE by ID
router.put("/:id", async (req: Request, res: Response) => {
    const product: Product = products.find(p => p.id.toString() === req.params.id)!; 

    // UPDATE LOGIC
    fs.writeFileSync(PATH_JSON_PRODUCTS, JSON.stringify(products));
})

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
    const productIndex = products.findIndex(p => p.id.toString() === req.params.id)!;
    if (!productIndex) {
        res.status(404).json({message: "Product not found"});
    } else {
        products.splice(
            productIndex,
            1
        );
        fs.writeFileSync(PATH_JSON_PRODUCTS, JSON.stringify(products));
        res.json(products);
    }
})

export default router;
