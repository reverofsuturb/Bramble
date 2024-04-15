import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCategoryById } from "../../store/categories";
import { Link, useParams } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

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
    return (
      <div>Oh no! We don&apos;t have any {category?.name} products yet!</div>
    );
  return (
    <div>
        <div className="category-name pacifico-regular">{category.name}</div>
        <div className="category-products-gallery">
      <div className="category-image-container">
        <img
          src={
            category?.CategoryImages?.length
              ? category?.CategoryImages[0]?.image
              : "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
          }
          className="category-image"
        />
      </div>
      {category.Products.map((product) => (
        <Link
          className="category-products-link"
          key={product.id}
          to={`/products/${product.id}`}
        >
          <div className="category-products-container">
            <img
              className="category-products-allimage"
              src={
                product?.ProductImages[0]?.image ||
                "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
              }
            />
            <div className="category-products-container-text">
              <div className="category-products-name">{product.name}</div>
              <div className="category-products-price">
                ${product?.price.toFixed(2)}
              </div>
              <div className="category-products-review-shop">
                <div className="category-products-rating">
                  {product.Reviews?.length ? (
                    <>
                      {getRating(product)} <FaRegStar />
                    </>
                  ) : (
                    "Not Rated"
                  )}
                </div>
                {product?.Shop?.id ? (
                  <div className="category-products-link-div">
                    By{" "}
                    <Link
                      className="category-products-link-shop"
                      to={`/shops/${product.Shop.id}`}
                    >
                      {product.Shop.name}
                    </Link>
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};
