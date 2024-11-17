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
import mongoose from "mongoose";

const PORT = envConfig.port;
const DB_CONNECTION = envConfig.db_connection!;

const app = express();
const v1 = express.Router(); // VERSION API V1
const v2 = express.Router(); // VERSION API V2
const swaggerDocs = swaggerJsdoc(swaggerOptions)

app.use(express.json()),

// DB
mongoose.connect(DB_CONNECTION);
const db = mongoose.connection;

db.on('error', 
  console.error.bind(console, 'Erreur de connexion à MongoDB')
);

db.once('open', () => {
  console.log('Connected successfully');
});


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

export default app;

// HTTPS
https
.createServer(
  {
    key: fs.readFileSync("./certs/server.key"),
    cert: fs.readFileSync("./certs/server.cert"),
  }, app
)
.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
