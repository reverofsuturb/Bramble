import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCategoryById } from "../../store/categories";
import { Link, useParams } from "react-router-dom";

import "./CategoryProductsById.css";

export const CategoryProductsById = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const category = useSelector((state) => state.categories[id]);

  console.log(category);

  const getRating = (prod) => {
    return prod.Reviews.reduce((a, c) => a + c.rating, 0) / prod.Reviews.length;
  };

  useEffect(() => {
    dispatch(thunkGetCategoryById(id));
  }, [dispatch, id]);

  if (!category?.Products?.length)
    return <div>Oh no! We don't have any {category?.name} products yet!</div>;
  return (
    <div className="category-products-gallery">
      <div className="category-name">{category.name}</div>
      {category.Products.map((product) => (
        <Link
          className="category-products-link"
          key={product.id}
          to={`/products/${product.id}`}
        >
          <div className="category-products-container">
            <img
              className="category-products-allimage"
              src={product?.ProductImages[0]?.image || "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"}
            />
            <div className="category-products-container-text">
              <div className="category-products-name">{product.name}</div>
              <div>${product.price.toFixed(2)}</div>
              <div className="category-products-review-shop">
                <div>
                  {product.Reviews?.length ? getRating(product) : "Not Rated"}
                </div>
                <div>
                  Visit{" "}
                  <Link
                    className="category-products-link-shop"
                    to={`/shops/${product.Shop.id}`}
                  >
                    {product.Shop.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
