import { Product } from "../models/product";
import { readJSON, saveJSON } from "../utils/jsonHelper";
import { isValidProduct } from "../utils/regex";

const PATH_JSON_PRODUCTS = "./src/data/products.json";

let products: Product[] = readJSON<Product>(PATH_JSON_PRODUCTS);

export const getProducts = (): Product[] => {
    return products;
}

export const getProduct = (id: string): Product => {
    return products.find(p => p.id.toString() === id)!; 
}

export const addProduct = (product: Product): string => {
    products.push({
        id: (products.at(-1)?.id!)+1,
        title: product.title,
        description: product.description,
        quantity: product.quantity,
        price: product.price
    }); 
    saveJSON<Product>(products, PATH_JSON_PRODUCTS);
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
        throw new Error(`There's no product with id ${id}`);
    }
    products.splice(productId, 1); // delete product
    saveJSON<Product>(products, PATH_JSON_PRODUCTS);
    return "Deleted Successfully";
}