import express, {Request, Response, NextFunction} from "express";

import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller";
import { Product } from "../models/product";
import { checkAccess, isGestionnaire } from "../middlewares/auth.middleware";
import { logger } from "../utils/logger";
import { isValidProduct } from "../utils/regex";

const router = express.Router();

/**
 * @swagger
 * /v1/products:
 *   get:
 *     description: Retrieve all products from products.json. A token is required. 
 *     responses:
 *       200:
 *         description: A list of products
 *       401:
 *         description: Not even authenticated
 */
router.get("/", checkAccess, async (req: Request, res: Response) => {
    res.json(getProducts());
});

/**
 * @swagger
 * /v1/products/{id}:
 *   get:
 *     description: Retrieve a specific product 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Id of the desired product
 *     responses:
 *       200:
 *         description: The desired product has been found and is returned in the response
 *       401:
 *         description: Not even authenticated
 *       404:
 *         description: The product associated with the specified Id couldn't be found
 */
router.get("/:id", checkAccess, async (req: Request, res: Response) => {
    const product = getProduct(req.params.id);
    if (!product) {
        res.status(404).json({message: "Product not found"});
    } else {
        res.json(product);
    }
})

/**
 * @swagger
 * /v1/products:
 *   post:
 *     description: Add a new product. Only authenticated users with Gestionnaire role have access to this 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product 
 *               description:
 *                 type: string
 *                 description: The description of the product
 *               category:
 *                 type: string
 *                 description: The category of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product
 *     responses:
 *       201:
 *         description: The product has been added
 *       400:
 *         description: The product couldn't be added because product informations are in the wrong format
 *       401:
 *         description: Not even authenticated
 *       403:
 *         description: Authenticated user is not a gestionnaire
 */
router.post("/", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const product: Product = {...req.body};
    if (isValidProduct(product)) {
        res.status(201).json({message: addProduct(product)});
        logger.info(`New product has been added - ${product.title}`);
    } else {
        res.status(400).json({message: "Product couldn't be added"}); 
        logger.error("Product can't be added because it's in the wrong format");
    }
});

/**
 * @swagger
 * /v1/products/{id}:
 *   put:
 *     description: Update a product. Only authenticated users with Gestionnaire role have access to this 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the product
 *               description:
 *                 type: string
 *                 description: The new description of the product 
 *               category:
 *                 type: string
 *                 description: The new category of the product
 *               price:
 *                 type: number
 *                 description: The new price of the product
 *               quantity:
 *                 type: number
 *                 description: The new quantity of the product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Id of the product to update
 *     responses:
 *       200:
 *         description: The product has been updated
 *       401:
 *         description: Not even authenticated
 *       403:
 *         description: Authenticated user is not a gestionnaire
 *       500:
 *         description: The product couldn't be added because product informations are in the wrong format
 */
router.put("/:id", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const toUpdatePId = req.params.id;
    const product: Product = {...req.body};
    if (isValidProduct(product)) {
        res.status(200).json({message: updateProduct(toUpdatePId, product)});
        logger.info(`Product with id ${toUpdatePId} has been updated`);
    } else {
        res.status(500).json({message: "Product couldn't be updated"});
        logger.error(`Couldn't update product with id ${toUpdatePId}`)
    }
})

/**
 * @swagger
 * /v1/products/{id}:
 *   delete:
 *     description: Delete a product. Only authenticated users with Gestionnaire role have access to this 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Id of the product to delete
 *     responses:
 *       204:
 *         description: The product has been deleted
 *       401:
 *         description: Not even authenticated
 *       403:
 *         description: Authenticated user is not a gestionnaire
 *       404:
 *         description: The product to update couldn't be found
 */
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
