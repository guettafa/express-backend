import express, { Request, Response } from "express";
import productsRoutes from "./routes/products.route";
import usersRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import https from "https";
import fs from "fs";
import { envConfig, swaggerOptions } from "./config/config";
import { addSampleProducts } from "./utils/jsonHelper";

const PORT = envConfig.port;

const app = express();
const v1 = express.Router(); // VERSION API V1
const swaggerDocs = swaggerJsdoc(swaggerOptions)

app.use(express.json()),

// VERSIONING
v1.use("/products", productsRoutes, )
v1.use("/users", usersRoutes)
v1.use("/auth", authRoutes);
v1.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1", v1);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

// HTTP / HTTPS
// https
//     .createServer(
//         {
//             key: fs.readFileSync("./certs/server.key"),
//             cert: fs.readFileSync("./certs/server.cert"),
//         }, app
//     )
//     .listen(PORT, () => {
//         addSampleProducts();
//         console.log(`Listening on port ${PORT}`);
//     });

app.listen(PORT, () => {
    addSampleProducts();
    console.log(`Listening on port ${PORT}`);
})