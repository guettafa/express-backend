import express, {Request, Response} from "express";

import { Product } from "../models/product";
import fs from "fs";

const router = express.Router();
const products = fs.readFileSync("./src/data/products.json");
 
// GET
router.get("/", async (req: Request, res: Response) => {
    res.send(products);
});

// POST
router.post("/", async (req: Request, res: Response) => {
    const product: Product = req.body;
    fs.writeFileSync("../data/products.json", products);
    res.json({message: "Product added successfully"});
});

// GET BY ID
router.get("/:id", async (req: Request, res: Response) => {
    // const product: Product = products.find(p => p.id.toString() === req.params.id)!; 
    // if (!product) {
    //     res.status(404).json({message: "Product not found"});
    // } else {
    //     res.json(product);
    // }
})

// PUT by ID
router.put("/:id", (req: Request, res: Response) => {
})

// DELETE by ID
router.delete("/:id", (req: Request, res: Response) => {
})

export default router;
