"use client";

import { useCarts } from "@/app/+context/cart.context";
import { useProducts } from "@/app/+context/products.context";
import { useEffect, useState } from "react";
import { CartProvider } from "../../+context/cart.context";
import { ProductProvider } from "../../+context/products.context";
import { UserProvider } from "../../+context/user.context";
import { API_URLS } from "../../+definitions/api.definition";
import { Cart, ProductInCart } from "../../+definitions/cart.definition";
import { Product } from "../../+definitions/product.definition";
import { LcCounter } from "../dom/LcCounter";
import { LcDialog } from "../ui/LcDialog";
import { LcProduct } from "../ui/LcProduct";

export function LcProductsInCart() {
  return (
    <UserProvider>
      <CartProvider>
        <ProductProvider>
          <LcProductsInCartImpl />
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  );
}

export function LcProductsInCartImpl() {
  const { findById } = useProducts();
  const { carts, setLastCartProductCount } = useCarts();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productToRemove, setProductToRemove] = useState<
    ProductInCart | undefined
  >(undefined);
  const [productsInCartState, setProductsInCartState] = useState<
    ProductInCart[] | undefined
  >();
  const [copyOfProductsInCartState, setCopyOfProductsInCartState] = useState<
    ProductInCart[] | undefined
  >(undefined);

  const updateCart = async (cart: Cart) => {
    const url = API_URLS.cart.updateCart.replace("{cartId}", `${cart.id}`);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    const data: Cart[] = await response.json();

    /**
     * refetch or something to update the product count
     */
    if (data && data.length > 0) {
      setLastCartProductCount(data[data.length - 1].products.length);
    }
  };

  useEffect(() => {
    const cart = carts && carts[carts.length - 1];
    const productsInCart: ProductInCart[] | undefined = cart?.products.map(
      (cartProduct) => {
        const product = findById(cartProduct.productId);
        return {
          ...(product as Product),
          ...cartProduct,
        };
      }
    );
    setProductsInCartState(productsInCart);
  }, [carts]);

  useEffect(() => {
    if (
      !!copyOfProductsInCartState &&
      copyOfProductsInCartState !== productsInCartState
    ) {
      const cart = carts && carts[carts.length - 1];
      if (cart) {
        const updatedCart: Cart = {
          ...cart,
          products:
            productsInCartState?.map((productInCart) => ({
              productId: productInCart.id,
              quantity: productInCart.quantity,
            })) || [],
        };
        updateCart(updatedCart);
      }
    }
  }, [productsInCartState]);

  const setCount = (productId: number, quantity: number) => {
    if (!!productsInCartState) {
      setCopyOfProductsInCartState(productsInCartState);
    }
    setProductsInCartState((prevState) => {
      if (quantity === 0) {
        setShowConfirmDialog(true);
        setProductToRemove(
          productsInCartState?.find(({ id }) => id === productId)
        );
      }
      return prevState?.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      );
    });
  };

  const cancelRemoveProductFromCart = () => {
    if (productToRemove !== null && productToRemove !== undefined) {
      setCount(productToRemove.id, 1);
    }
    setShowConfirmDialog(false);
  };

  const removeProductFromCart = () => {
    if (productToRemove) {
      setProductsInCartState((prevState) => {
        return prevState?.filter(
          (product) => product.id !== productToRemove.id
        );
      });
    }

    setShowConfirmDialog(false);
  };

  return (
    <div className="grid place-content-center">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {productsInCartState && productsInCartState.length === 0 && (
            <div className="col-span-full grid place-content-center h-[50vh]">
              The cart is empty
            </div>
          )}
          {productsInCartState?.map(
            (productInCart) =>
              productInCart && (
                <LcProduct key={productInCart.id} product={productInCart}>
                  <div className="grid place-content-center h-full w-full p-2">
                    <LcCounter
                      count={productInCart.quantity}
                      setCount={(quantity) =>
                        setCount(productInCart.id, quantity)
                      }
                    />
                  </div>
                  {showConfirmDialog && (
                    <LcDialog
                      onCancel={cancelRemoveProductFromCart}
                      onConfirm={removeProductFromCart}
                    >
                      <p className="font-semibold mb-4">
                        Remove this product from cart?
                      </p>
                      <div className="flex justify-content-center">
                        {productToRemove && (
                          <LcProduct product={productToRemove} />
                        )}
                      </div>
                    </LcDialog>
                  )}
                </LcProduct>
              )
          )}
        </div>
      </div>
    </div>
  );
}
