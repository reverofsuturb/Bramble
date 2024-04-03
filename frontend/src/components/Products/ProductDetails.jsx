import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { thunkGetProducts } from "../../store/products";
import { ProductImageForm } from "../ProductImages/ProductImageForm";
import { PostReview } from "../Reviews/PostReview";
import { ReviewCard } from "../Reviews/ReviewCard";
import "./ProductDetails.css";

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.products[id]);
  const idType = "product";

  const getRating = (prod) => {
    return prod.Reviews.reduce((a, c) => a + c.rating, 0) / prod.Reviews.length;
  };

  useEffect(() => {
    dispatch(thunkGetProducts());
  }, [dispatch, id]);

  if (!product) return <>/</>;
  return (
    <div className="prodetails-container">
      <div className="prodetails-imgdetails-container">
        <img
          className="prodetails-image"
          src={product?.ProductImages[0].image}
        />
        <div className="prodetails-container-text">
          <div>${product.price.toFixed(2)}</div>
          <div className="prodetails-name">{product.name}</div>
          <div>{product.Reviews.length ? getRating(product) : "Not Rated"}</div>
          <div>{product.description}</div>
          <div>{product.details}</div>
          <div>{product.shipping}</div>
        </div>
      </div>
      <ProductImageForm id={product.id} description={product.description} />
      <Link to={`/products/${product.id}/edit`}>EDIT</Link>
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
  );
};
