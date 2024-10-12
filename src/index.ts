import express, { Request, Response } from "express";

import productsRoutes from "./routes/products.route";
import usersRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";

import { config } from "./config/config";
import { Product } from "./models/product";

import fs from "fs";

const app = express();
const PORT = config.port;

const addSampleProducts = async ()  => {
    let products: Product[] = [];
    await fetch('https://fakestoreapi.com/products/4')
        .then(res=>res.json())
        .then(json=>products.push(json)!);

    console.log(products);
    // fs.writeFileSync("./src/data/products.json", JSON.stringify(product));

    // productArray.push(product);
    // console.log(product);
}

// Parse Responses to JSON 
app.use(express.json()),

// Root
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

// Products
app.use("/products", productsRoutes)

// Users
app.use("/users", usersRoutes)
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    addSampleProducts();
    console.log(`Listening on port ${PORT}`);
});

