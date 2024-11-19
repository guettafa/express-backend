import express, {Request, Response, NextFunction} from "express";

import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller";
import { IProduct } from "../interfaces/Iproduct";
import { checkAccess, isGestionnaire } from "../middlewares/auth.middleware";
import { logger } from "../utils/logger";
import { NotFoundError } from "rxjs";

const router = express.Router();

/**
 * @swagger
 * /api/v2/products:
 *   get:
 *     description: Retrieve all products from products collection. A token is required. 
 *     responses:
 *       200:
 *         description: A list of products
 *       401:
 *         description: Not even authenticated
 */
router.get("/", async (req: Request, res: Response) => {
    res.json(await getProducts());
});

/**
 * @swagger
 * /api/v2/products/{title}:
 *   get:
 *     description: Retrieve a specific product 
 *     parameters:
 *       - name: title
 *         in: path
 *         required: true
 *         description: The title of the desired product
 *     responses:
 *       200:
 *         description: The desired product has been found and is returned in the response
 *       401:
 *         description: Not even authenticated
 *       404:
 *         description: The product associated with the specified title couldn't be found
 */
router.get("/:title", checkAccess, async (req: Request, res: Response) => {
    try {
      const product = await getProduct(req.params.title);
      if (product == null) throw NotFoundError;
      res.json(product);
    } catch (error) {
      res.status(404).json({message: "Product not found"});
    }
});

/**
 * @swagger
 * /api/v2/products:
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
    const product: IProduct = {...req.body};
    try {
      const success = await addProduct(product)

      logger.info(`Product has been added - ${product.title}`);
      res.status(201).json({message: success});
    } 
    catch (error) {
      logger.error(`Product can't be added - Wrong format : ${product} - Reason : ${error}`);
      res.status(500).json({message: `Can't add the product - ${error}`});
    }
});

/**
 * @swagger
 * /api/v2/products/{title}:
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
 *       - name: title
 *         in: path
 *         required: true
 *         description: The title of the product to update
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
router.put("/:title", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const product: IProduct = {...req.body};

    try {
      res.status(200).json({message: updateProduct(req.params.title, product)});
      logger.info(`Product has been updated`);

    } catch (error) {
      res.status(500).json({message: "Internal server error - Can't update the product"});
    }
});

/**
 * @swagger
 * /api/v2/products/{title}:
 *   delete:
 *     description: Delete a product. Only authenticated users with Gestionnaire role have access to this 
 *     parameters:
 *       - name: title
 *         in: path
 *         required: true
 *         description: The title of the product to delete
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
router.delete("/:title", checkAccess, isGestionnaire, async (req: Request, res: Response) => {
    const product = req.params.title;
    try {
        res.status(204).json({message: await deleteProduct(product)});
        logger.info(`Product with id ${product} has been deleted`);
    } catch (error) {
        res.status(404).json({message: `Product not found - ${error}`});
        logger.error(`Couldn't delete product with id ${product}`);
    }
})

export default router;
