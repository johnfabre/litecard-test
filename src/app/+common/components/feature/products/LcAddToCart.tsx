import { isNil } from "lodash-es";
import { useState } from "react";
import { useCart } from "../../../data-access/carts/cart.context";
import { CartData } from "../../../data-access/carts/cart.data";
import { Product } from "../../../definitions/product.definition";
import { LcLoading } from "../../ui/LcLoading";
import { LcButton } from "../../ui/dom/LcButton";

interface LcAddToCartProps {
  product: Product;
}

export function LcAddToCart({ product }: LcAddToCartProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { cart, updateCartState } = useCart();

  const addToCart = async () => {
    if (cart) {
      setIsAdding(() => true);
      const cartFromServer = await CartData.addProductToCart(product, cart);
      updateCartState(cartFromServer);
      setIsAdding(() => false);
    }
  };

  return isNil(cart) ? (
    <div role="status" className="max-w-sm h-lg animate-pulse p-2 md:p-4">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
    </div>
  ) : isAdding ? (
    <LcLoading customText="Please wait" />
  ) : (
    <LcButton
      className="w-full bg-green-800 text-gray-100 rounded-none"
      text="Add to cart"
      onClick={addToCart}
    />
  );
}
