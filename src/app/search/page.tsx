import { LcSearchResults } from "../+common/components/feature/search/LcSearchResults";
import { ProductData } from "../+common/data-access/products/product.data";

export default async function SearchPage() {
  const products = await ProductData.fetchProducts();
  return (
    <>
      <LcSearchResults products={products} />
    </>
  );
}
