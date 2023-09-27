"use client";

import { useEffect, useState } from "react";
import { CartProvider } from "../../+context/cart.context";
import { ProductProvider, useProducts } from "../../+context/products.context";
import { UserProvider } from "../../+context/user.context";
import { Product } from "../../+definitions/product.definition";
import { LcSelect } from "../dom/LcSelect";
import { LcProduct } from "../ui/LcProduct";
import { LcAddToCart } from "./LcAddToCart";

export function LcProductListFiltered() {
  return (
    <UserProvider>
      <CartProvider>
        <ProductProvider>
          <LcProductListImpl />
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  );
}

export function LcProductListImpl() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    Product[] | undefined
  >();
  const [filterCategory, setFilterCategory] = useState<string | undefined>();

  const { products } = useProducts();

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
      const uniqueCategories = new Set(products.map((prod) => prod.category));
      const uniqueCategoriesArr = [...uniqueCategories];
      setCategories(uniqueCategoriesArr);
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (filterCategory) {
      setFilteredProducts(
        products?.filter((product) => product.category === filterCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [filterCategory]);

  const doFilter = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <div className="grid place-content-center">
      <div className="flex justify-center items-center p-4">
        <div className="mr-4">Filter by category</div>
        <div>
          <LcSelect
            options={categories.map((cat) => ({
              label: cat.toUpperCase(),
              value: cat,
            }))}
            onChange={(e) => doFilter(e.target.value)}
          ></LcSelect>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoading || !filteredProducts ? (
            <div className="col-span-full flex justify-center">
              <div role="status" className="max-w-sm h-lg animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
              </div>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div key={index} className="w-[80vw] md:w-auto">
                <LcProduct product={product}>
                  <LcAddToCart product={product} />
                </LcProduct>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
