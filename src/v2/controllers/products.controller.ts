import Products from "../models/product";
import { IProduct } from "../interfaces/Iproduct";

export const getProducts = async () => {
  const products = await Products.find();
  return products;
}

export const getProduct = async (title: string) => {
  return Products.findOne({ title: title}); // find by title
}

export const addProduct = async (product: IProduct)=> {
    const newProduct = new Products(product);
    newProduct.save();

    return "Added Sucessfully";
}

// TO FIX
export const updateProduct = async (oldProduct: IProduct, newProduct: IProduct) => {
    await Products.updateOne({ title: oldProduct})
    return "Updated Sucessfully";
}

export const deleteProduct = async (title: string) => {
    await Products.findOneAndDelete({ title: title});
    return `Product ${title} has been deleted with success`;
}