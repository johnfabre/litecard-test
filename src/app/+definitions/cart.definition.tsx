import { Product } from "./product.definition";

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
  __v: number;
}

export interface CartProduct {
  productId: number;
  quantity: number;
}

export type ProductInCart = Product & CartProduct;
