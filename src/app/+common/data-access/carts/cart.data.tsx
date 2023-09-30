import { cloneDeep, isNil, last, remove } from "lodash-es";
import { API_URLS } from "../../definitions/api.definition";
import {
  Cart,
  CartProduct,
  ProductInCart,
} from "../../definitions/cart.definition";
import { Maybe } from "../../definitions/common.definition";
import { Product } from "../../definitions/product.definition";
import { User } from "../../definitions/user.definition";
import { ProductData } from "../products/product.data";

export class CartData {
  public static async fetchCarts(userId: User["id"]): Promise<Maybe<Cart[]>> {
    if (isNil(userId)) {
      return null;
    }
    const url = API_URLS.cart.getUserCart.replace("{userId}", String(userId));
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch carts");
    }

    return response.json();
  }

  public static async fetchLatestCart(
    userId: User["id"]
  ): Promise<Maybe<Cart>> {
    const carts = await CartData.fetchCarts(userId);
    return (
      last(carts) ||
      ({
        userId,
        date: new Date().toISOString(),
        products: [] as CartProduct[],
      } as Cart)
    );
  }

  public static async createCart(cart: Cart): Promise<Cart> {
    const url = API_URLS.cart.createCart;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    return response.json();
  }

  public static async updateCart(cart: Cart): Promise<Cart> {
    const url = API_URLS.cart.updateCart.replace("{cartId}", `${cart.id}`);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    return response.json();
  }

  public static async addProductToCart(
    product: Product,
    cart: Cart
  ): Promise<Cart> {
    const updatedCart = cloneDeep(cart);

    const existingProduct = updatedCart.products.find(
      (p) => p.productId === product.id
    );

    if (existingProduct) {
      // If product is already in the cart, increment the quantity
      existingProduct.quantity += 1;
    } else {
      // If product is not in the cart, add it with a quantity of 1
      updatedCart.products.push({
        productId: product.id,
        quantity: 1,
      });
    }

    if (isNil(updatedCart.id)) {
      return CartData.createCart(updatedCart);
    }

    return CartData.updateCart(updatedCart);
  }

  public static async updateProductQuantityInCart(
    cart: Cart,
    productId: Product["id"],
    quantity: number
  ) {
    const updatedCart = cloneDeep(cart);
    let cartProduct = updatedCart.products.find(
      (cp) => cp.productId === productId
    );

    if (quantity) {
      if (cartProduct) {
        cartProduct.quantity = quantity;
      } else {
        cartProduct = {
          productId,
          quantity,
        };
        updatedCart.products.push(cartProduct);
      }
    } else {
      if (cartProduct) {
        remove(updatedCart.products, cartProduct);
      }
    }

    return CartData.updateCart(updatedCart);
  }

  public static async fetchProductsInCart(
    cart: Cart
  ): Promise<ProductInCart[]> {
    const productPromises = cart.products.map((cartProduct) =>
      ProductData.fetchProduct(cartProduct.productId)
    );
    const fetchedProducts = await Promise.all(productPromises);

    const result: ProductInCart[] = [];
    fetchedProducts.forEach((prod) => {
      const cp = cart.products.find((c) => c.productId === prod?.id);
      if (!isNil(prod) && !isNil(cp)) {
        result.push({
          ...prod,
          ...cp,
        });
      }
    });

    return result;
  }
}
