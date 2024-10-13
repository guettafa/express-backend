import express, { Request, Response } from "express";

import productsRoutes from "./routes/products.route";
import usersRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import https from "https";

import { envConfig, swaggerOptions } from "./config/config";
import { Product } from "./models/product";
import { saveJSON } from "./utils/jsonHelper";

const app = express();
const v1 = express.Router(); // VERSION API V1

const swaggerDocs = swaggerJsdoc(swaggerOptions)

const PORT = envConfig.port;
const PATH_JSON_PRODUCTS = "./src/data/products.json";

// To add products at the beginning
const addSampleProducts = async ()  => {
    let products: Product[] = [];
    await fetch('https://fakestoreapi.com/products/1')
        .then(res=>res.json())
        .then(json=>products.push(
            {
                id: json.id,
                title: json.title,
                description: json.description,
                quantity: Math.round(Math.random()*50),
                category: json.category,
                price: json.price
            }
        ));
    saveJSON<Product>(products, PATH_JSON_PRODUCTS);
}

app.use(express.json()),

v1.use("/products", productsRoutes, )
v1.use("/users", usersRoutes)
v1.use("/auth", authRoutes);
v1.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/v1", v1);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    addSampleProducts();
    console.log(`Listening on port ${PORT}`);
});

