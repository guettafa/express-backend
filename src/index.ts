import express, { Request, Response } from "express";

import productsRoutes from "./routes/products.route";
import usersRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";

import { config } from "./config/config";
import { Product } from "./models/product";
import { saveJSON } from "./utils/jsonHelper";

const app = express();
const PORT = config.port;
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
                price: json.price
            }
        ));
    saveJSON<Product>(products, PATH_JSON_PRODUCTS);
}

// Parse Responses to JSON 
app.use(express.json()),

// Root
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use("/products", productsRoutes, )
app.use("/users", usersRoutes)
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    addSampleProducts();
    console.log(`Listening on port ${PORT}`);
});

