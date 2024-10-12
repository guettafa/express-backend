import fs from "fs";
import { Product } from "../models/product";

const PATH_JSON_PRODUCTS = "./src/data/products.json";

export const readJSON = (): Product[] => {
    return JSON.parse(
        fs.readFileSync(PATH_JSON_PRODUCTS)
            .toString()
    )
}
export const saveJSON = (productsArray: Product[]) => {
    fs.writeFileSync(
        PATH_JSON_PRODUCTS, 
        JSON.stringify(productsArray)
    );
}