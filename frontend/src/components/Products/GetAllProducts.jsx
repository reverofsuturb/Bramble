import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetProducts, thunkDeleteProduct } from "../../store/products";
import { Link } from "react-router-dom";
import { ReviewCard } from "../Reviews/ReviewCard";
import { PostReview } from "../Reviews/PostReview";
import { ProductImageForm } from "../ProductImages/ProductImageForm";
import { thunkGetProductImages } from "../../store/productimages";
import "./GetAllProducts.css";

export const GetAllProducts = () => {
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  // const productImagesObj = useSelector((state) => state.productimages);
  const products = Object.values(productsObj);
  const getRating = (prod) => {
    return prod.Reviews.reduce((a, c) => a + c.rating, 0) / prod.Reviews.length;
  };
  useEffect(() => {
    dispatch(thunkGetProducts());
    dispatch(thunkGetProductImages());
  }, [dispatch]);

  return (
    <div className="products-gallery">
      {products?.map((product) => (
        <Link
          className="products-link"
          key={product.id}
          to={`/products/${product.id}`}
        >
          <div className="products-container">
            <img
              className="products-allimage"
              src={product?.ProductImages[0].image}
            />
            <div className="products-container-text">
              <div className="products-name">{product.name}</div>
              <div>${product.price.toFixed(2)}</div>
              <div>
                {product.Reviews.length ? getRating(product) : "Not Rated"}
              </div>
              <div>{product?.Category.name}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
