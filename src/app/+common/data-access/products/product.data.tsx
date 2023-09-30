import { API_URLS } from "../../definitions/api.definition";
import { Maybe } from "../../definitions/common.definition";
import { Product } from "../../definitions/product.definition";

export class ProductData {
  public static async fetchProducts(): Promise<Maybe<Product[]>> {
    const url = API_URLS.products.getAll;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  }

  public static async fetchProduct(id: Product["id"]): Promise<Maybe<Product>> {
    const url = API_URLS.products.getOne.replace("{productId}", String(id));
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return response.json();
  }
}
