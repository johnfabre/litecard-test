export const API_URLS = {
  products: {
    getAll: "https://fakestoreapi.com/products",
    getOne: "https://fakestoreapi.com/products/{productId}",
  },
  cart: {
    getUserCart: "https://fakestoreapi.com/carts/user/{userId}",
    updateCart: "https://fakestoreapi.com/carts/{cartId}",
  },
  user: {
    getById: "https://fakestoreapi.com/users/{userId}",
    update: "https://fakestoreapi.com/users/{userId}",
  },
};
