import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetProducts, thunkDeleteProduct } from "../../store/products";
import { Link } from "react-router-dom";
import { ReviewCard } from "../Reviews/ReviewCard";
import { PostReview } from "../Reviews/PostReview";
import { ProductImageForm } from "../ProductImages/ProductImageForm";
import "./GetAllProducts.css";
import { thunkGetProductImages } from "../../store/productimages";

export const GetAllProducts = () => {
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  const productImagesObj = useSelector((state) => state.productimages);
  const products = Object.values(productsObj);
  const idType = "product";

  useEffect(() => {
    dispatch(thunkGetProducts());
    dispatch(thunkGetProductImages());
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
          <ProductImageForm id={product.id} description={product.description} />
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
