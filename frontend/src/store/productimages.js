import { csrfFetch } from "./csrf";

export const GET_PRODUCT_IMAGES = "productimages/getProductImages";
export const POST_PRODUCT_IMAGE = "productimages/postProductImage";

export const getProductImages = (images) => ({
  type: "GET_PRODUCT_IMAGES",
  images,
});

export const postProductImage = (image) => ({
  type: "POST_IMAGE",
  image,
});

export const thunkGetProductImages = () => async (dispatch) => {
  const response = await csrfFetch("/api/productimages");
  const images = await response.json();
  if (images.errors) {
    return images.errors;
  }
  console.log(images);
  dispatch(getProductImages(images));
};

export const thunkPostProductImage = (id, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append("id", id);

  // multiple files if needed
  // if (images && images.length !== 0) {
  //   for (var i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }

  if (image) formData.append("image", image);
  console.log(formData);
  const response = await csrfFetch(`/api/productimages/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  const newImage = await dispatch(postProductImage(data));
  return newImage;
};

export const productImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_IMAGES: {
      const productImageState = {};
      action.images.forEach((image) => {
        productImageState[image.id] = image;
      });
      return productImageState;
    }
    case POST_PRODUCT_IMAGE:
      return { ...state, [action.image.id]: action.image };
    default:
      return state;
  }
};
