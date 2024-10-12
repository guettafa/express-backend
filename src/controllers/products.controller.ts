
import { NotFoundError } from "rxjs";
import { Product } from "../models/product";
import { readJSON, saveJSON } from "../utils/productUtils";

let products: Product[] = readJSON();

export const getProducts = (): Product[] => {
    return products;
}

export const getProduct = (id: string): Product => {
    return products.find(p => p.id.toString() === id)!; 
}

export const addProduct = (product: Product): string => {
    // REGEX TO CHECK
    products.push({
        id: (products.at(-1)?.id!)+1,
        title: product.title,
        description: product.description,
        price: product.price
    }); 

    console.log(products);
    
    saveJSON(products);
    return "Added Successfully";
}

export const updateProduct = (id: string): string => {
    const product = getProduct(id);

    // UPDATE LOGIC

    return "Updated Successfully";
}

export const deleteProduct = (id: string): string => {
    const productId = products.indexOf(getProduct(id));
    if (productId === -1) {
        throw new Error(`There's no product with the id ${id}`);
    }
    products.splice(productId,1); // delete product
    saveJSON(products);
    return "Deleted Successfully";
}