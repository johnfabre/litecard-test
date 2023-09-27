import { LcProductList } from "../feature/LcProductList";

export function LcPageHome() {
  return (
    <div>
      <div className="text-xl mb-8">Shop for products</div>
      <LcProductList></LcProductList>
    </div>
  );
}
