"use client";

import { isEmpty } from "lodash-es";
import { useState } from "react";
import { ProductInCart } from "../../../definitions/cart.definition";
import { Maybe } from "../../../definitions/common.definition";
import {
  Product,
  ProductListType,
} from "../../../definitions/product.definition";
import { ArrayUtils } from "../../../utils/array.utils";
import { Hooks } from "../../../utils/hooks";
import { LcProduct } from "../../ui/products/LcProduct";
import { LcProductsFilterByCategory } from "../../ui/products/LcProductsFilterByCategory";
import {
  LcProductsSortBy,
  LcProductsSortOption,
} from "../../ui/products/LcProductsSortBy";
import { LcAddToCart } from "./LcAddToCart";
import { LcProductCounter } from "./LcProductCounter";

interface LcProductListProps {
  products: Maybe<Product[]>;
  listType: ProductListType;
}

export function LcProductList({ products, listType }: LcProductListProps) {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState<Maybe<LcProductsSortOption>>();

  Hooks.useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  Hooks.useEffect(() => {
    let newDisplayedProduct = filteredProducts;
    if (sortOption && sortOption.sortOrder && sortOption.field) {
      newDisplayedProduct = ArrayUtils.sortBy(
        newDisplayedProduct,
        sortOption.field,
        sortOption.sortOrder
      );
    }
    setDisplayedProducts(newDisplayedProduct);
  }, [filteredProducts, sortOption]);

  return (
    <div className="grid place-content-center">
      {!isEmpty(products) && (
        <div className="grid grid-cols-1 md:grid-cols-5 p-4">
          <div className="col-span-3">
            <LcProductsFilterByCategory
              products={products}
              onChange={setFilteredProducts}
            />
          </div>
          <div className="col-span-2">
            <LcProductsSortBy onSort={setSortOption} />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {!displayedProducts ? (
            <div className="col-span-full flex justify-center">
              <LcLoadingProducts />
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="col-span-full flex justify-center">
              <LcProductsEmpty />
            </div>
          ) : (
            displayedProducts.map((product) => (
              <div key={product.id} className="w-[80vw] md:w-auto">
                <LcProduct product={product}>
                  {listType === ProductListType.SHOP && (
                    <LcAddToCart product={product}></LcAddToCart>
                  )}
                  {listType === ProductListType.CART && (
                    <div className="grid place-content-center h-full w-full p-2">
                      <LcProductCounter product={product as ProductInCart} />
                    </div>
                  )}
                </LcProduct>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function LcLoadingProducts() {
  return (
    <div role="status" className="max-w-sm h-lg animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
    </div>
  );
}

function LcProductsEmpty() {
  return <div className="py-24">No products found.</div>;
}
