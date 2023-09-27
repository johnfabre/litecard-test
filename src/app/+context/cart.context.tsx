import { createContext, useContext, useEffect, useState } from "react";
import { API_URLS } from "../+definitions/api.definition";
import { Cart } from "../+definitions/cart.definition";
import { useUser } from "./user.context";

interface CartContextValue {
  carts: Cart[] | undefined;
  lastCartProductCount: number | undefined;
  refetch: () => Promise<void>;
  setLastCartProductCount: (count: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children?: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [carts, setCarts] = useState<Cart[] | undefined>(undefined);
  const [lastCartProductCount, setLastCartProductCount] = useState<
    number | undefined
  >(undefined);
  const { user } = useUser();

  const fetchCarts = async () => {
    const userId = user?.id;
    if (userId) {
      const url = API_URLS.cart.getUserCart.replace("{userId}", String(userId));
      const response = await fetch(url);
      const data: Cart[] = await response.json();
      setCarts(data);

      if (data && data.length > 0) {
        setLastCartProductCount(data[data.length - 1].products.length);
      }
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        carts,
        refetch: fetchCarts,
        lastCartProductCount,
        setLastCartProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCarts = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCarts must be used within a CartProvider");
  }
  return context;
};
