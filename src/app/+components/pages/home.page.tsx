import { LcProductListFiltered } from "../feature/LcProductList_filtered";

export function LcPageHome() {
  return (
    <div>
      <div className="text-xl mb-8">Shop for products</div>
      <LcProductListFiltered />
    </div>
  );
}
