import { Product } from "../models/product";

export const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const isValidProduct = (p: Product) => {
    const titleRgx = /^[A-Za-z\s]{3,50}$/;
    const qantRgx  = /^(0|[1-9]\d*)$/
    const priceRgx = /^\d+(\.\d+)?$/;
    return (titleRgx.test(p.title) && qantRgx.test(p.quantity.toString()) && priceRgx.test(p.price.toString()));
}