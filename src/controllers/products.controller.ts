
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
    products.push(product); // Add item to array of products

    saveJSON(products);
    return "Added Successfully";
}

export const updateProduct = (id: string): string => {
    const product = getProduct(id);

    // UPDATE LOGIC

    return "Updated Successfully";
}

export const deleteProduct = (id: string): string => {
    const product = products.indexOf(getProduct(id));
    products.splice(product,1); // delete product

    saveJSON(products);
    return "Deleted Successfully";
}