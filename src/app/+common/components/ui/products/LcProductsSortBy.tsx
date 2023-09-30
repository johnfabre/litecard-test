import { isNil } from "lodash-es";
import { useState } from "react";
import { Maybe, SortOrder } from "../../../definitions/common.definition";
import { Product } from "../../../definitions/product.definition";
import { Hooks } from "../../../utils/hooks";
import { LcButton } from "../dom/LcButton";
import { LcSelect } from "../dom/LcSelect";

interface LcProductsSortByProps {
  onSort: (sortOrder: Maybe<LcProductsSortOption>) => void;
}

const SORT_BY_OPTIONS = [
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Category",
    value: "category",
  },
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Rating",
    value: "rating.rate",
  },
];

export interface LcProductsSortOption {
  field: Maybe<keyof Product>;
  sortOrder: Maybe<SortOrder>;
}

export function LcProductsSortBy({ onSort }: LcProductsSortByProps) {
  const [sortOrder, setSortOrder] =
    useState<LcProductsSortOption["sortOrder"]>(null);
  const [sortByKey, setSortByKey] =
    useState<LcProductsSortOption["field"]>(null);

  Hooks.useEffect(() => {
    onSort({
      field: sortByKey || null,
      sortOrder: sortOrder || null,
    });
  }, [sortOrder, sortByKey]);

  const onChange = (value: keyof Product) => {
    setSortByKey(value);
    if (!value) {
      setSortOrder(null);
    }
  };

  const sortButtonClicked = () =>
    setSortOrder((prev) => {
      if (prev === SortOrder.DESC) return SortOrder.ASC;
      if (prev === SortOrder.ASC) return SortOrder.DESC;
      return SortOrder.ASC;
    });

  return (
    <>
      <div className="mr-4">Sort by</div>
      <div className="flex">
        <LcSelect
          options={SORT_BY_OPTIONS}
          onChange={onChange}
          value={sortByKey || ""}
        />
        <LcButton
          icon={`fas ${
            isNil(sortOrder)
              ? "fa-sort"
              : `fa-arrow-${sortOrder === SortOrder.ASC ? "up" : "down"}`
          }`}
          onClick={sortButtonClicked}
          disabled={!sortByKey}
        />
      </div>
    </>
  );
}
