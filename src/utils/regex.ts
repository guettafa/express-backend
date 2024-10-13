import { Product } from "../models/product";

export const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const validateProduct = (p: Product) => {
    const titleRgx = /^[A-Za-z\s]{3,50}$/;
    const qantRgx  = /^[1-9]\d*|0$/;
    const priceRgx = /^\d+(\.\d+)?$/;
    return (titleRgx.test(p.title) && qantRgx.test(p.quantity.toString()) && priceRgx.test(p.price.toString()));
}