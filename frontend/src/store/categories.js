import { csrfFetch } from "./csrf";

// action type creators
export const GET_CATEGORIES = "categories/getCategories";
export const GET_CATEGORY_BY_ID = "categories/getCategoryById";
export const POST_CATEGORY = "categories/postCategory";
export const PUT_CATEGORY = "categories/putCategory";
export const DELETE_CATEGORY = "categories/deleteCategory";

// action creators
export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const getCategoryById = (category) => ({
  type: GET_CATEGORY_BY_ID,
  category,
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

export const thunkGetCategoryById = (categoryId) => async (dispatch) => {
  const response = await csrfFetch(`/api/categories/${categoryId}`);
  const category = await response.json();
  if (category.errors) {
    return category;
  }
  dispatch(getCategoryById(category));
};

export const thunkPostCategory = (category) => async (dispatch) => {
  const response = await csrfFetch("/api/categories/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  const newCategory = await response.json();
  if (newCategory.errors) {
    console.log(newCategory.errors);
    return newCategory;
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
    return editCategory;
  }
  dispatch(putCategory(editCategory));
};

export const thunkDeleteCategory = (categoryId) => async (dispatch) => {
  const response = await csrfFetch(`/api/categories/${categoryId}`, {
    method: "DELETE",
  });
  const category = await response.json();
  if (category.errors) {
    return category;
  }
  await dispatch(deleteCategory(categoryId));
};

// reducer

export const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      const categoriesState = {};
      console.log(action.categories)
      action.categories.forEach((category) => {
        categoriesState[category.id] = category;
      });
      return categoriesState;
    }
    case GET_CATEGORY_BY_ID: {
      return { ...state, [action.category.id]: action.category };
    }
    case POST_CATEGORY:
      return { ...state, [action.category.id]: action.category };
    case PUT_CATEGORY:
      return { ...state, [action.category.id]: action.category };
    case DELETE_CATEGORY: {
      const categoriesState = { ...state };
      delete categoriesState[action.categoryId];
      return categoriesState;
    }
    default:
      return state;
  }
};
