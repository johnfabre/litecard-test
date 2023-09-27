"use client";

import { useEffect, useState } from "react";
import { CartProvider } from "../../+context/cart.context";
import { UserProvider } from "../../+context/user.context";
import { API_URLS } from "../../+definitions/api.definition";
import { LcButton } from "../dom/LcButton";
import { LcProduct } from "../ui/LcProduct";
import { LcAddToCart } from "./LcAddToCart";

export function LcProductList() {
  return (
    <UserProvider>
      <CartProvider>
        <LcProductListImpl />
      </CartProvider>
    </UserProvider>
  );
}

export function LcProductListImpl() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URLS.products.getAll}?limit=${limit}`);
    const data = await response.json();
    setIsLoading(false);
    setProducts(data);
  };

  const loadMoreProducts = () => {
    setLimit(limit + 3);
  };

  useEffect(() => {
    fetchProducts();
  }, [limit]);

  return (
    <div className="grid place-content-center">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div key={index} className="w-[80vw] md:w-auto">
              <LcProduct product={product}>
                <LcAddToCart product={product} />
              </LcProduct>
            </div>
          ))}
          {isLoading && (
            <div className="col-span-full flex justify-center">
              <div role="status" className="max-w-sm h-lg animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        {!isLoading && (
          <LcButton
            className="mt-4 border"
            text="Load more"
            onClick={loadMoreProducts}
          ></LcButton>
        )}
      </div>
    </div>
  );
}
