import { csrfFetch } from "./csrf";

export const GET_SHOP_IMAGES = "shopimages/getShopImages";
export const POST_SHOP_IMAGE = "shopimages/postShopImage";

export const getShopImages = (images) => ({
  type: "GET_Shop_IMAGES",
  images,
});

export const postShopImage = (image) => ({
  type: "POST_IMAGE",
  image,
});

export const thunkGetShopImages = () => async (dispatch) => {
  const response = await csrfFetch("/api/shopimages");
  const images = await response.json();
  if (images.errors) {
    return images.errors;
  }
  dispatch(getShopImages(images));
};

export const thunkPostShopImage = (id, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append("id", id);

  // multiple files if needed
  // if (images && images.length !== 0) {
  //   for (var i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }

  if (image) formData.append("image", image);

  const response = await csrfFetch(`/api/shopimages/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await response.json();
  const newImage = await dispatch(postShopImage(data));
  return newImage;
};

export const shopImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHOP_IMAGES: {
      const shopImageState = {};
      action.images.forEach((image) => {
        shopImageState[image.id] = image;
      });
      return shopImageState;
    }
    case POST_SHOP_IMAGE:
      return { ...state, [action.image.id]: action.image };
    default:
      return state;
  }
};
