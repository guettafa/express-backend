import express, { Request, Response } from "express";

import productsRoutes from "./routes/products";
import usersRoutes from "./routes/users";

const app = express();
const PORT = 3000;

// Parse Responses to JSON 
app.use(express.json()),

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

// /products
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)

app.listen(PORT, () => {
    fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
            .then(json=>console.log(json))
    console.log(`Listening on port ${PORT}`);
});

