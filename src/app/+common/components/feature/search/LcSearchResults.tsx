"use client";

import { includes, isNil } from "lodash-es";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "../../../Routes";
import { Maybe } from "../../../definitions/common.definition";
import { Product } from "../../../definitions/product.definition";
import { Hooks } from "../../../utils/hooks";
import { LcSearchProductList } from "./LcSearchProductList";

interface LcSearchResultsProps {
  products: Maybe<Product[]>;
}

export function LcSearchResults({ products }: LcSearchResultsProps) {
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase().trim() || "";

  if (isNil(query) || query === "") {
    router.push(ROUTES.home);
  }

  Hooks.useEffect(() => {
    setFilteredProducts(
      products?.filter(
        (p) =>
          includes(p.title.toLowerCase(), query) ||
          includes(p.category.toLowerCase(), query) ||
          includes(p.description.toLowerCase(), query)
      )
    );
  }, [query]);

  return (
    <>
      <h1>Search results for: {query}</h1>
      <span className="text-xs">
        {filteredProducts?.length || 0} result
        {filteredProducts?.length === 1 ? "" : "s"}
      </span>
      <LcSearchProductList products={filteredProducts} />
    </>
  );
}
