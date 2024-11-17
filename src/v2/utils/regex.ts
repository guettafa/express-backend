import { Products } from "../interfaces/product";

export const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const isValidProduct = (p: Products) => {
    const titleRgx = /^[A-Za-z\s]{3,50}$/;
    const quantRgx  = /^(0|[1-9]\d*)$/
    const priceRgx = /^\d+(\.\d+)?$/;
    return (titleRgx.test(p.title) && quantRgx.test(p.quantity.toString()) && priceRgx.test(p.price.toString()));
}