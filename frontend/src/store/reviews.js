import { csrfFetch } from "./csrf";

// action type creators
export const GET_REVIEWS = "reviews/getReviews";
export const POST_REVIEW = "reviews/postReview";
export const PUT_REVIEW = "reviews/putReview";
export const DELETE_REVIEW = "reviews/deleteReview";

// action creators
export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const postReview = (review) => ({
  type: POST_REVIEW,
  review,
});

export const putReview = (review) => ({
  type: PUT_REVIEW,
  review,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// thunks

export const thunkGetReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews");
  const reviews = await response.json();
  if (reviews.errors) {
    return reviews;
  }
  dispatch(getReviews(reviews));
};

export const thunkPostReview = (review) => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const newReview = await response.json();
  if (newReview.errors) {
    return newReview;
  }
  dispatch(postReview(newReview));
};

export const thunkPutReview = (reviewId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const editReview = await response.json();
  if (editReview.errors) {
    return editReview;
  }
  dispatch(putReview(editReview));
};

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  const review = await response.json();
  if (review.errors) {
    return review;
  }
  await dispatch(deleteReview(reviewId));
};

// reducer

export const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const reviewState = {};
      action.reviews.forEach((review) => {
        reviewState[review.id] = review;
      });
      return reviewState;
    }
    case POST_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case PUT_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case DELETE_REVIEW: {
      const reviewState = { ...state };
      delete reviewState[action.reviewId];
      return reviewState;
    }
    default:
      return state;
  }
};
