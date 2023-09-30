"use client";

import { isEmpty } from "lodash-es";
import Link from "next/link";
import React from "react";
import { ROUTES } from "../../../Routes";
import { useCart } from "../../../data-access/carts/cart.context";
import { ClientSideContextProvider } from "../../../data-access/client-side.context";
import { useUser } from "../../../data-access/users/user.context";
import { LcSearchProductInput } from "../search/LcSearchProductInput";

type LcHeaderProps = {
  children?: React.ReactNode;
};

export function LcHeader({ children }: LcHeaderProps) {
  return (
    <ClientSideContextProvider>
      <header className="bg-inherit p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow">
        <div className="md:block text-lg font-bold">
          <Link href={ROUTES.home}>Litecard Mall</Link>
        </div>
        <div className="flex items-center w-4/5 md:w-3/5 gap-2">
          <div className="flex-grow">
            <LcSearchProductInput />
          </div>

          <Link href={ROUTES.cart} className="p-2 relative">
            <i className="fa fa-shopping-cart" />
            <LcCartBadge />
          </Link>
          <Link href={ROUTES.user} className="p-2 flex align-center">
            <div>
              <i className="fa fa-user" />
            </div>
            <LcUsernameText />
          </Link>
        </div>
      </header>
      {children}
    </ClientSideContextProvider>
  );
}

function LcCartBadge() {
  const { cart } = useCart();
  return (
    !isEmpty(cart?.products) && (
      <div
        className="absolute bg-red-600 rounded-lg top-0 right-0 text-xs p-1 text-white outline outline-1"
        style={{ lineHeight: "0.5rem" }}
      >
        {cart?.products.length}
      </div>
    )
  );
}

function LcUsernameText() {
  const { user } = useUser();
  return (
    <div className="ml-2 truncate" style={{ maxWidth: "8ch" }}>
      {user?.username}
    </div>
  );
}
