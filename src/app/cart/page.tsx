import { LcCartProductList } from "../+common/components/feature/carts/LcCartProductList";
import { LcPageTitle } from "../+common/components/ui/LcPageTitle";

export default async function CartPage() {
  return (
    <>
      <div className="flex flex-col">
        <LcPageTitle title="Review your cart" />
        <LcCartProductList />
      </div>
    </>
  );
}
