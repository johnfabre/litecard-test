const HOSTS = {
  fakeStoreApi: "https://fakestoreapi.com",
};

export const API_URLS = {
  products: {
    getAll: `${HOSTS.fakeStoreApi}/products`,
    getOne: `${HOSTS.fakeStoreApi}/products/{productId}`,
  },
  cart: {
    getUserCart: `${HOSTS.fakeStoreApi}/carts/user/{userId}`,
    updateCart: `${HOSTS.fakeStoreApi}/carts/{cartId}`,
    createCart: `${HOSTS.fakeStoreApi}/carts`,
  },
  user: {
    getById: `${HOSTS.fakeStoreApi}/users/{userId}`,
    update: `${HOSTS.fakeStoreApi}/users/{userId}`,
  },
};
