import express, { Request, Response } from "express";

import productsRoutes from "./routes/products.route";
import usersRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";

import { config } from "./config/config";

const app = express();
const PORT = config.port;

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
    console.log(`Listening on port ${PORT}`);
});

