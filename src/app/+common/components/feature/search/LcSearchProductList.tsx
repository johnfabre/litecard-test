import { Maybe } from "../../../definitions/common.definition";
import {
  Product,
  ProductListType,
} from "../../../definitions/product.definition";
import { LcProductList } from "../products/LcProductList";

interface LcSearchProductListProps {
  products: Maybe<Product[]>;
}

export function LcSearchProductList({ products }: LcSearchProductListProps) {
  return <LcProductList products={products} listType={ProductListType.SHOP} />;
}
