import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import { productsReducer } from "./products";
import { shopsReducer } from "./shops";
import { reviewsReducer } from "./reviews";
import { categoriesReducer } from "./categories";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productsReducer,
  shops: shopsReducer,
  reviews: reviewsReducer,
  categories: categoriesReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
