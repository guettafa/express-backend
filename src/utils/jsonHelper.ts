import fs from "fs";
import { Product } from "../models/product";

export const readJSON = <T>(path: string): T[] => {
    return JSON.parse(
        fs.readFileSync(path)
            .toString()
    )
}
export const saveJSON = <T>(objectArray: T[], path: string) => {
    fs.writeFileSync(
        path, JSON.stringify(objectArray)
    );
}

// To add products at the beginning
export const addSampleProducts = async ()  => {
    let products: Product[] = [];
    await fetch('https://fakestoreapi.com/products/1')
        .then(res=>res.json())
        .then(json=>products.push(
            {
                title: json.title,
                description: json.description,
                quantity: Math.round(Math.random()*50),
                category: json.category,
                price: json.price,
                id: json.id
            }
        ));
    saveJSON<Product>(products, "./src/data/products.json");
}
