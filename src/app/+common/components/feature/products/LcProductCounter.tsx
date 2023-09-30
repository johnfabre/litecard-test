import { isNil } from "lodash-es";
import { useState } from "react";
import { useCart } from "../../../data-access/carts/cart.context";
import { CartData } from "../../../data-access/carts/cart.data";
import { Cart, ProductInCart } from "../../../definitions/cart.definition";
import { LcConfirmationDialog } from "../../ui/LcConfirmationDialog";
import { LcLoading } from "../../ui/LcLoading";
import { LcCounter } from "../../ui/dom/LcCounter";
import { LcProduct } from "../../ui/products/LcProduct";

interface LcProductCounterProps {
  product: ProductInCart;
}

export function LcProductCounter({ product }: LcProductCounterProps) {
  const { cart, updateCartState } = useCart();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uiQuantity, setUiQuantity] = useState(product.quantity);

  const updateProductQuantity = async (quantity: number) => {
    if (isNil(cart)) return;
    if (quantity <= 0) {
      setShowConfirmDialog(true);
      return;
    }
    updateCart(cart, quantity);
  };

  const updateCart = async (cart: Cart, quantity: number) => {
    setIsLoading(true);
    const cartFromServer = await CartData.updateProductQuantityInCart(
      cart,
      product.id,
      quantity
    );
    updateCartState(cartFromServer);
    setUiQuantity(quantity);
    setIsLoading(false);
  };

  return isLoading ? (
    <LcLoading customText="Please wait..."></LcLoading>
  ) : (
    <>
      <LcCounter count={uiQuantity} setCount={updateProductQuantity} />
      {showConfirmDialog && (
        <LcConfirmationDialog
          onCancel={() => {
            setShowConfirmDialog(false);
          }}
          onConfirm={() => {
            if (isNil(cart)) return;
            updateCart(cart, 0);
            setShowConfirmDialog(false);
          }}
        >
          <p className="font-semibold mb-4">Remove this product from cart?</p>
          <div className="flex justify-content-center md:px-3">
            <LcProduct product={product} />
          </div>
        </LcConfirmationDialog>
      )}
    </>
  );
}
