import { LcProductList } from "./+common/components/feature/products/LcProductList";
import { LcPageTitle } from "./+common/components/ui/LcPageTitle";
import { ProductData } from "./+common/data-access/products/product.data";
import { ProductListType } from "./+common/definitions/product.definition";

export default async function HomePage() {
  return (
    <>
      <LcPageTitle title="Shop for products" />
      <LcProductList
        products={await ProductData.fetchProducts()}
        listType={ProductListType.SHOP}
      />
    </>
  );
}
