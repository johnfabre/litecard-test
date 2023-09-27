"use client";

import { useCarts } from "@/app/+context/cart.context";
import { API_URLS } from "@/app/+definitions/api.definition";
import { useState } from "react";
import { Product } from "../../+definitions/product.definition";
import { LcButton } from "../dom/LcButton";

interface LcAddToCartProps {
  product: Product;
}

export function LcAddToCart({ product }: LcAddToCartProps) {
  const { carts, refetch } = useCarts();
  const [isLoading, setIsLoading] = useState(false);
  const [tick, setTick] = useState(false);

  const addToCart = async () => {
    if (!carts) {
      console.log("Carts are not loaded yet");
      return;
    }

    const cart = carts[carts.length - 1]; // just the last cart.

    // Check if product is already in the cart
    const existingProduct = cart.products.find(
      (p) => p.productId === product.id
    );

    if (existingProduct) {
      // If product is already in the cart, increment the quantity
      existingProduct.quantity += 1;
    } else {
      // If product is not in the cart, add it with a quantity of 1
      cart.products.push({
        productId: product.id,
        quantity: 1,
      });
    }

    setIsLoading(true);
    // Send updated cart data to API
    const url = API_URLS.cart.updateCart.replace("{cartId}", `${cart.id}`);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    const data = await response.json();
    setIsLoading(false);
    setTick(true);
    setTimeout(() => {
      setTick(false);
    }, 1500);

    refetch();
  };

  return isLoading ? (
    <LcButton
      className="w-full bg-green-800 rounded-none bg-gray-200 dark:bg-gray-700 animate-pulse inline"
      text="Adding to cart"
    ></LcButton>
  ) : tick ? (
    <LcButton
      className="w-full bg-green-800 rounded-none bg-green-200 dark:bg-green-700 animate-pulse inline"
      text="OK"
    ></LcButton>
  ) : (
    <LcButton
      className="w-full bg-green-800 text-gray-100 rounded-none"
      text="Add to cart"
      onClick={addToCart}
    ></LcButton>
  );
}
