import { csrfFetch } from "./csrf";

// action type creators
export const GET_CATEGORIES = "categories/getCategories";
export const POST_CATEGORY = "categories/postCategory";
export const PUT_CATEGORY = "categories/putCategory";
export const DELETE_CATEGORY = "categories/deleteCategory";

// action creators
export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const postCategory = (category) => ({
  type: POST_CATEGORY,
  category,
});

export const putCategory = (category) => ({
  type: PUT_CATEGORY,
  category,
});

export const deleteCategory = (categoryId) => ({
  type: DELETE_CATEGORY,
  categoryId,
});

// thunks

export const thunkGetCategories = () => async (dispatch) => {
  const response = await csrfFetch("/api/categories");
  const categories = await response.json();
  if (categories.errors) {
    return categories;
  }
  dispatch(getCategories(categories));
};

export const thunkPostCategory = (category) => async (dispatch) => {
  const response = await csrfFetch("/api/categories/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  const newCategory = await response.json();
  if (newCategory.errors) {
    return newCategory.errors;
  }
  dispatch(postCategory(newCategory));
};

export const thunkPutCategory = (categoryId, category) => async (dispatch) => {
  const response = await csrfFetch(`/api/categories/${categoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  const editCategory = await response.json();
  if (editCategory.errors) {
    return editCategory.errors;
  }
  dispatch(putCategory(editCategory));
};

export const thunkDeleteCategory = (categoryId) => async (dispatch) => {
  const response = await csrfFetch(`/api/categories/${categoryId}`, {
    method: "DELETE",
  });
  const category = await response.json();
  if (category.errors) {
    return category.errors;
  }
  await dispatch(deleteCategory(categoryId));
};

// reducer

export const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      const categoriesState = {};
      action.categories.forEach((category) => {
        categoriesState[category.id] = category;
      });
      return categoriesState;
    }
    case POST_CATEGORY:
      return { ...state, [action.category.id]: action.category };
    case PUT_CATEGORY:
      return { ...state, [action.category.id]: action.category };
    case DELETE_CATEGORY:
      const categoriesState = { ...state };
      delete categoriesState[action.categoryId];
      return categoriesState;
    default:
      return state;
  }
};
