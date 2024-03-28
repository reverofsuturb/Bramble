import { csrfFetch } from "./csrf";

// action type creators
export const GET_PRODUCTS = "products/getProducts";
export const POST_PRODUCT = "products/postProduct";
export const PUT_PRODUCT = "products/putProduct";
export const DELETE_PRODUCT = "products/deleteProduct";

// action creators
export const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

export const postProduct = (product) => ({
  type: POST_PRODUCT,
  product,
});

export const putProduct = (product) => ({
  type: PUT_PRODUCT,
  product,
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

// thunks

export const thunkGetProducts = () => async (dispatch) => {
  const response = await csrfFetch("/api/products");
  const products = await response.json();
  if (products.errors) {
    return products;
  }
  dispatch(getProducts(products));
};

export const thunkPostProduct = (product) => async (dispatch) => {
  const response = await csrfFetch("/api/products/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const newProduct = await response.json();
  if (newProduct.errors) {
    return newProduct.errors;
  }
  dispatch(postProduct(newProduct));
};

export const thunkPutProduct = (productId, product) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const editProduct = await response.json();
  if (editProduct.errors) {
    return editProduct.errors;
  }
  dispatch(putProduct(editProduct));
};

export const thunkDeleteProduct = (productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  const product = await response.json();
  if (product.errors) {
    return product.errors;
  }
  await dispatch(deleteProduct(productId));
  console.log(`deleted ${productId}`);
};

// reducer

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      const productState = {};
      action.products.forEach((product) => {
        productState[product.id] = product;
      });
      return productState;
    }
    case POST_PRODUCT:
      return { ...state, [action.product.id]: action.product };
    case PUT_PRODUCT:
      return { ...state, [action.product.id]: action.product };
    case DELETE_PRODUCT:
      const productState = { ...state };
      delete productState[action.productId];
      return productState;
    default:
      return state;
  }
};
