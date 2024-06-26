import { csrfFetch } from "./csrf";

// action type creators
export const GET_SHOPS = "shops/getShops";
export const POST_SHOP = "shops/postShop";
export const PUT_SHOP = "shops/putShop";
export const DELETE_SHOP = "shops/deleteShop";

// action creators
export const getShops = (shops) => ({
  type: GET_SHOPS,
  shops,
});

export const postShop = (shop) => ({
  type: POST_SHOP,
  shop,
});

export const putShop = (shop) => ({
  type: PUT_SHOP,
  shop,
});

export const deleteShop = (shopId) => ({
  type: DELETE_SHOP,
  shopId,
});

// thunks

export const thunkGetShops = () => async (dispatch) => {
  const response = await csrfFetch("/api/shops");
  const shops = await response.json();
  if (shops.errors) {
    return shops;
  }
  dispatch(getShops(shops));
};

export const thunkPostShop = (shop) => async (dispatch) => {
  const response = await csrfFetch("/api/shops/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shop),
  });
  const newShop = await response.json();
  if (newShop.errors) {
    return newShop;
  }
  await dispatch(postShop(newShop));
  return newShop;
};

export const thunkPutShop = (shopId, shop) => async (dispatch) => {
  const response = await csrfFetch(`/api/shops/${shopId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shop),
  });
  const editShop = await response.json();
  if (editShop.errors) {
    return editShop;
  }
  await dispatch(putShop(editShop));
  return editShop;
};

export const thunkDeleteShop = (shopId) => async (dispatch) => {
  const response = await csrfFetch(`/api/shops/${shopId}`, {
    method: "DELETE",
  });
  const shop = await response.json();
  if (shop.errors) {
    return shop;
  }
  await dispatch(deleteShop(shopId));
};

// reducer

export const shopsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHOPS: {
      const shopState = {};
      action.shops.forEach((shop) => {
        shopState[shop.id] = shop;
      });
      return shopState;
    }
    case POST_SHOP:
      return { ...state, [action.shop.id]: action.shop };
    case PUT_SHOP:
      return { ...state, [action.shop.id]: action.shop };
    case DELETE_SHOP: {
      const shopState = { ...state };
      delete shopState[action.shopId];
      return shopState;
    }
    default:
      return state;
  }
};
