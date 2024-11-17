import Product from "../models/products";
import { Products } from "../interfaces/product";

export const getProducts = async () => {
  return await Product.find();
}

export const getProduct = async (id: string) => {
  return await Product.findById(id);
}

export const addProduct = (product: any): string => {
    const newProduct = {...product};
    Product.create(newProduct);
    return "Added Sucessfully";
}

export const updateProduct = async (oldProduct: any, newProduct: any) => {
    await Product.findByIdAndUpdate(oldProduct.id, newProduct);
    return "Updated Sucessfully";
}

export const deleteProduct = async (id: string) => {
    await Product.findByIdAndDelete(id);
    return `Product with id ${id} has been deleted with success`;
}