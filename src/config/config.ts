import dotenv from "dotenv";

dotenv.config({
  path: 
    process.env.NODE_ENV == 'test' ? '.env.test' : '.env.prod'
});

export const envConfig = {
    port: process.env.PORT,
    db_connection: process.env.DB_CONNECTION,
    jwt_secret: process.env.SECRET_KEY
}

export const swaggerOptions = {
    definition: 
    {
      openapi: '3.0.0',
      info: 
      {
        title: 'Product API',
        version: '1.0.0',
        description: 'A simple API to manage products',
      },
    },
    apis: ['./src/v2/routes/*.route.ts', './src/v1/routes/*.route.ts'],
};