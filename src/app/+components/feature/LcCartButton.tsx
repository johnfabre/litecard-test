"use client";

import { CartProvider, useCarts } from "../../+context/cart.context";
import { UserProvider } from "../../+context/user.context";
import { LcButton } from "../dom/LcButton";

interface LcCartButtonProps {
  onClick?: () => void;
}

export function LcCartButton({ onClick }: LcCartButtonProps) {
  return (
    <UserProvider>
      <CartProvider>
        <CartButtonImpl onClick={onClick} />
      </CartProvider>
    </UserProvider>
  );
}

function CartButtonImpl({ onClick }: LcCartButtonProps) {
  const { lastCartProductCount } = useCarts();

  return (
    <div className="relative">
      <LcButton icon="fa fa-shopping-cart" onClick={onClick}></LcButton>
      {lastCartProductCount !== undefined && (
        <div
          className="absolute bg-red-600 rounded top-0 right-0 text-xs p-1"
          style={{ lineHeight: "0.5rem" }}
        >
          {lastCartProductCount}
        </div>
      )}
    </div>
  );
}
