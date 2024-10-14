import { Product } from "../models/product";
import { readJSON, saveJSON } from "../utils/jsonHelper";

const PATH_JSON_PRODUCTS = "./src/data/products.json";

let products: Product[] = readJSON<Product>(PATH_JSON_PRODUCTS);

export const getProducts = (): Product[] => {
    return products;
}

export const getProduct = (id: string): Product => {
    return products.find(p => p.id.toString() === id)!; 
}

export const addProduct = (product: Product): string => {
    product.id = products.at(-1)?.id!+1;
    const newProduct: Product = {...product};
    
    products.push({...newProduct}); 
    saveJSON<Product>(products, PATH_JSON_PRODUCTS);
    return "Added Sucessfully";
}

export const updateProduct = (oldProduct: Product, newProduct: Product): string => {
    newProduct.id = oldProduct.id;
    products[products.indexOf(oldProduct)] = {...newProduct};
    saveJSON<Product>(products, PATH_JSON_PRODUCTS);
    return "Updated Sucessfully";
}

export const deleteProduct = (id: string): string => {
    const productId = products.indexOf(getProduct(id));
    if (productId === -1) {
        throw new Error(`There's no product with id ${id}`);
    }
    products.splice(productId, 1); // delete product
    saveJSON<Product>(products, PATH_JSON_PRODUCTS);
    return `Product with id ${productId} has been deleted with sucess`;
}