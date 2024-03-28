import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetProducts, thunkDeleteProduct } from "../../store/products";
import { Link } from "react-router-dom";
import { ReviewCard } from "../Reviews/ReviewCard";
import { PostReview } from "../Reviews/PostReview";
import "./GetAllProducts.css";

export const GetAllProducts = () => {
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);
  const idType = "product";


  useEffect(() => {
    dispatch(thunkGetProducts());
  }, [dispatch]);

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id} className="products-container">
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.description}</div>
          <div>{product.details}</div>
          <div>{product.shipping}</div>
          <Link to={`/products/${product.id}`}>EDIT</Link>
          <button onClick={() => dispatch(thunkDeleteProduct(product.id))}>
            DELETE
          </button>
          <PostReview id={product.id} idType={idType} />
          <div>
            {product.Reviews?.length ? "Reviews:" : ""}
            {product.Reviews?.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                id={product.id}
                idType={idType}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};