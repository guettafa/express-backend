import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
    port: process.env.PORT,
    jwt_secret: process.env.SECRET_KEY
}

export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Product API',
        version: '1.0.0',
        description: 'A simple API to manage products',
      },
    },
    apis: ['./src/routes/*.route.ts'],
};
