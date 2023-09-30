import { capitalize, isEmpty, isNil, uniq } from "lodash-es";
import { useState } from "react";
import { Maybe } from "../../../definitions/common.definition";
import { Product } from "../../../definitions/product.definition";
import { Hooks } from "../../../utils/hooks";
import { LcButton } from "../dom/LcButton";
import { LcSelect } from "../dom/LcSelect";

interface LcProductsFilterByCategoryProps {
  products: Maybe<Product[]>;
  onChange: (products: Maybe<Product[]>) => void;
}

export function LcProductsFilterByCategory({
  products,
  onChange,
}: LcProductsFilterByCategoryProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Maybe<string>>();

  Hooks.useEffect(() => {
    if (products) {
      setCategories(() => uniq(products.map(({ category }) => category)));
    }
  }, [products]);

  const onCategoryChange = (value: string | null) => {
    let result;
    if (isEmpty(value)) {
      result = products;
    } else {
      result = products?.filter((product) => product.category === value);
    }
    setSelectedCategory(value);
    onChange(result);
  };

  const selectOptions = categories.map((cat) => ({
    label: capitalize(cat),
    value: cat,
  }));

  const clearClicked = () => {
    onCategoryChange("");
  };

  return (
    <>
      <div className="mr-4">Filter by category</div>
      <div className="flex">
        <LcSelect
          options={selectOptions}
          onChange={onCategoryChange}
          emptyOptionLabel="Show all"
          value={selectedCategory || ""}
        />
        <LcButton
          text="Clear"
          disabled={selectedCategory === "" || isNil(selectedCategory)}
          onClick={clearClicked}
        />
      </div>
    </>
  );
}
