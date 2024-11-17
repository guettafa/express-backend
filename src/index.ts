import express, { Request, Response } from "express";

// V1
import productsRoutesV1 from "./v1/routes/products.route";
import usersRoutesV1 from "./v1/routes/users.route";
import authRoutesV1 from "./v1/routes/auth.route";

// V2
import productsRoutesV2 from "./v2/routes/products.route";
import usersRoutesV2 from "./v2/routes/users.route";
import authRoutesV2 from "./v2/routes/auth.route";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import https from "https";
import fs from "fs";
import { envConfig, swaggerOptions } from "./config/config";

import { addSampleProducts as addSampleProductsV1 } from "./v1/utils/jsonHelper";
import { addSampleProducts as addSampleProductsV2 } from "./v2/utils/jsonHelper"

const PORT = envConfig.port;

const app = express();
const v1 = express.Router(); // VERSION API V1
const v2 = express.Router(); // VERSION API V1
const swaggerDocs = swaggerJsdoc(swaggerOptions)

app.use(express.json()),

// VERSIONING
v1.use("/products", productsRoutesV1, )
v1.use("/users", usersRoutesV1)
v1.use("/auth", authRoutesV1);
v1.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1", v1);

v2.use("/products", productsRoutesV2, )
v2.use("/users", usersRoutesV2)
v2.use("/auth", authRoutesV2);
v2.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v2", v2);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

// HTTPS
https
    .createServer(
        {
            key: fs.readFileSync("./certs/server.key"),
            cert: fs.readFileSync("./certs/server.cert"),
        }, app
    )
    .listen(PORT, () => {
        addSampleProductsV1();
        addSampleProductsV2();
        console.log(`Listening on port ${PORT}`);
    });

