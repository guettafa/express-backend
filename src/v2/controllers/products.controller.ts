import Products from "../models/product";
import { IProduct } from "../interfaces/Iproduct";

export const getProducts = async () => {
  const products = await Products.find();
  return products;
}

export const getProduct = async (title: string) => {
  return await Products.findOne({ title: title}); // find by title
}

export const addProduct = async (product: IProduct)=> {
  await new Products(product).save();
  return "Added Sucessfully";
}

export const updateProduct = async (title: string, newProduct: IProduct) => {
  await Products.findOneAndUpdate({ title: title}, newProduct);
  return "Updated Sucessfully";
}

export const deleteProduct = async (title: string) => {
  await Products.deleteOne({title: title});
  return `Product ${title} has been deleted with success`;
}