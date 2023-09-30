import { isNil } from "lodash-es";
import React, { createContext, useContext } from "react";
import { Maybe } from "../definitions/common.definition";
import { CartProvider } from "./carts/cart.context";
import { UserProvider } from "./users/user.context";

export interface ClientSideContext {}

interface ClientSideContextProviderProps {
  children?: React.ReactNode;
}

const clientSideContext = createContext<Maybe<ClientSideContext>>(null);

export function ClientSideContextProvider({
  children,
}: ClientSideContextProviderProps) {
  return (
    <clientSideContext.Provider value={{}}>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </clientSideContext.Provider>
  );
}

export function useClientSideContext() {
  const context = useContext(clientSideContext);
  if (isNil(context)) {
    throw new Error(
      "useClientSideContext must be used within a ClientSideContextProvider"
    );
  }
  return context;
}
