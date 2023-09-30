"use client";

import { isEmpty } from "lodash-es";
import { useState } from "react";
import { useCart } from "../../../data-access/carts/cart.context";
import { CartData } from "../../../data-access/carts/cart.data";
import { Cart, ProductInCart } from "../../../definitions/cart.definition";
import { Maybe } from "../../../definitions/common.definition";
import { ProductListType } from "../../../definitions/product.definition";
import { Hooks } from "../../../utils/hooks";
import { LcButton } from "../../ui/dom/LcButton";
import { LcProductList } from "../products/LcProductList";

export function LcCartProductList() {
  const [productsInCart, setProductsInCart] =
    useState<Maybe<ProductInCart[]>>(null);
  const { cart } = useCart();

  const updateProductsIncart = async (cart: Cart) => {
    const _productsInCart = await CartData.fetchProductsInCart(cart);
    setProductsInCart(_productsInCart);
  };

  Hooks.useEffect(() => {
    if (cart) {
      updateProductsIncart(cart);
    }
  }, [cart?.products.map((product) => product.productId) || []]);

  return (
    <>
      <LcProductList
        products={productsInCart}
        listType={ProductListType.CART}
      />
      {!isEmpty(cart?.products) && (
        <LcButton
          className="mt-8 max-w-md w-full self-center bg-green-800 text-gray-100"
          text="Proceed to checkout"
          disabled={isEmpty(productsInCart)}
        />
      )}
    </>
  );
}
