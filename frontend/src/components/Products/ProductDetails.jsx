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
  const user = useSelector((state) => state.session.user);
  const idType = "product";

  const getRating = (prod) => {
    return prod.Reviews.reduce((a, c) => a + c.rating, 0) / prod.Reviews.length;
  };
  const reviewFind = product.Reviews.find(
    (review) => (review.user_id = user.id)
  );

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
          <div>
            Visit{" "}
            <Link className="prodetails-link-shop" to={`/shops/${product?.Shop.id}`}>{product?.Shop.name}</Link>
          </div>
          <div>{product.description}</div>
          <div>{product.details}</div>
          <div>{product.shipping}</div>
        </div>
      </div>
      <div className="prodetails-utilities">
        <ProductImageForm
          id={product.id}
          name={product.name}
          description={product.description}
        />
        <Link to={`/products/${product.id}/edit`}>
          <button className="prodetails-button">EDIT PRODUCT</button>
        </Link>
        <button
          className="prodetails-button"
          onClick={() => dispatch(thunkDeleteProduct(product.id))}
        >
          DELETE PRODUCT
        </button>
      </div>
      {reviewFind ? "" : <PostReview id={product.id} idType={idType} />}
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
