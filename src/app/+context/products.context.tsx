import { createContext, useContext, useEffect, useState } from "react";
import { API_URLS } from "../+definitions/api.definition";
import { Product } from "../+definitions/product.definition";

interface ProductContextValue {
  products: Product[] | undefined;
  findById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined
);

interface ProductProviderProps {
  children?: React.ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const fetchProducts = async () => {
    const url = API_URLS.products.getAll;
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data);
  };

  const findById = (id: number) => {
    return products?.find((product) => product.id === id);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, findById }}>
      {" "}
      {children}{" "}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
