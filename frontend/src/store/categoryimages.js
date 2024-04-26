import { csrfFetch } from "./csrf";

export const GET_CATEGORY_IMAGES = "categoryimages/getCategoryImages";
export const POST_CATEGORY_IMAGE = "categoryimages/postCategoryImage";

export const getCategoryImages = (images) => ({
  type: "GET_Category_IMAGES",
  images,
});

export const postCategoryImage = (image) => ({
  type: "POST_IMAGE",
  image,
});

export const thunkGetCategoryImages = () => async (dispatch) => {
  const response = await csrfFetch("/api/categoryimages");
  const images = await response.json();
  if (images.errors) {
    return images.errors;
  }
  dispatch(getCategoryImages(images));
};

export const thunkPostCategoryImage = (id, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append("id", id);

  // multiple files if needed
  // if (images && images.length !== 0) {
  //   for (var i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }

  if (image) formData.append("image", image);

  const response = await csrfFetch(`/api/categoryimages/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await response.json();
  const newImage = await dispatch(postCategoryImage(data));
  return newImage;
};

export const categoryImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_IMAGES: {
      const categoryImageState = {};
      action.images.forEach((image) => {
        categoryImageState[image.id] = image;
      });
      return categoryImageState;
    }
    case POST_CATEGORY_IMAGE:
      return { ...state, [action.image.id]: action.image };
    default:
      return state;
  }
};
