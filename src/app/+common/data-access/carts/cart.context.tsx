import { isNil } from "lodash-es";
import { createContext, useContext, useState } from "react";
import { Cart } from "../../definitions/cart.definition";
import { Maybe } from "../../definitions/common.definition";
import { Hooks } from "../../utils/hooks";
import { useUser } from "../users/user.context";
import { CartData } from "./cart.data";

type CartContextType = Maybe<Cart>;

export interface CartContext {
  cart: Maybe<Cart>;
  isLoading: boolean;
  updateCartState: (cart: Cart) => void;
  refresh: () => Promise<void>;
}

const cartContext = createContext<Maybe<CartContext>>(null);

interface CartProviderProps {
  children?: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const { user } = useUser();
  const [cart, setCart] = useState<CartContextType>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProvidedCart = async () => {
    if (user && !isNil(user.id)) {
      setIsLoading(() => true);
      const latestCart = await CartData.fetchLatestCart(user.id);
      setCart(latestCart);
      setIsLoading(() => false);
    }
  };

  // got annoyed by this triggering twice
  Hooks.useEffect(() => {
    loadProvidedCart();
  }, [user]);

  return (
    <cartContext.Provider
      value={{
        cart,
        isLoading,
        updateCartState: setCart,
        refresh: loadProvidedCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(cartContext);
  if (isNil(context)) {
    throw new Error("useCarts must be used within a CartProvider");
  }
  return context;
}
