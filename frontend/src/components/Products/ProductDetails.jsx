import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { thunkGetProducts } from "../../store/products";
import { thunkGetProductImages } from "../../store/productimages";
import { ProductImageForm } from "../ProductImages/ProductImageForm";
import { DeleteProduct } from "./DeleteProduct";
import { PostReview } from "../Reviews/PostReview";
import { ReviewCard } from "../Reviews/ReviewCard";
import OpenModalButton from "../OpenModalButton";
import "./ProductDetails.css";

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.products[id]);
  const user = useSelector((state) => state.session.user);
  const idType = "product";
  const [generating, isGenerating] = useState(false);
  const [uploading, isUploading] = useState(false);
  const [deleting, isDeleting] = useState(false);
  const getRating = (prod) => {
    return prod.Reviews.reduce((a, c) => a + c.rating, 0) / prod.Reviews.length;
  };
  let revLength = product?.Reviews?.length;
  console.log(revLength);
  const reviewFind = product?.Reviews?.find(
    (review) => review.user_id == user?.id
  );
  useEffect(() => {
    dispatch(thunkGetProducts());
    dispatch(thunkGetProductImages());
  }, [dispatch, id, generating, uploading, deleting, revLength]);

  if (!product) return <></>;
  return (
    <div className="prodetails-container">
      <div className="prodetails-imgdetails-container">
        <img
          className="prodetails-image"
          src={
            product?.ProductImages?.length
              ? product?.ProductImages[0]?.image
              : "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
          }
        />
        <div className="prodetails-container-text">
          <div>${product?.price.toFixed(2)}</div>
          <div className="prodetails-name">{product?.name}</div>
          <div>
            {product?.Reviews?.length ? getRating(product) : "Not Rated"}
          </div>
          {product?.Shop?.id ? (
            <div>
              Visit{" "}
              <Link
                className="category-products-link-shop"
                to={`/shops/${product?.Shop?.id}`}
              >
                {product?.Shop?.name}
              </Link>
            </div>
          ) : (
            " "
          )}
          <div>{product?.description}</div>
          <div>{product?.details}</div>
          <div>{product?.shipping}</div>
        </div>
      </div>
      <div className="prodetails-utilities">
        {generating ||
        uploading ||
        product?.ProductImages?.length ||
        product?.user_id != user?.id ? (
          ""
        ) : (
          <ProductImageForm
            id={product?.id}
            name={product?.name}
            description={product?.description}
            isGenerating={isGenerating}
            isUploading={isUploading}
          />
        )}
        {generating ? (
          <p className="loading">
            Your image is currently generating, please wait about 7-10 seconds
            and it should appear shortly
          </p>
        ) : (
          ""
        )}
        {uploading ? (
          <p className="loading">
            Your image is currently uploading, it should appear shortly
          </p>
        ) : (
          ""
        )}
        {user?.id == product?.user_id ? (
          <div>
            <Link to={`/products/${product?.id}/edit`}>
              <button className="prodetails-button">EDIT PRODUCT</button>
            </Link>
            <OpenModalButton
              buttonText={"DELETE PRODUCT"}
              modalComponent={
                <DeleteProduct id={product?.id} isDeleting={isDeleting} />
              }
            />{" "}
          </div>
        ) : (
          " "
        )}
      </div>
      {reviewFind || product?.user_id == user?.id ? (
        ""
      ) : user ? (
        <PostReview id={product?.id} idType={idType} />
      ) : (
        ""
      )}
      <div>
        {product?.Reviews?.length ? "Reviews:" : ""}
        {!deleting && product?.Reviews?.length
          ? product?.Reviews?.map((review) => (
              <ReviewCard key={review.id} id={id} review={review} idType={idType} />
            ))
          : ""}
      </div>
    </div>
  );
};
