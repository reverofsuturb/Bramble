import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { thunkGetShops } from "../../store/shops";
import { thunkGetShopImages } from "../../store/shopimages";
import { ShopImageForm } from "../ShopImages/ShopImageForm";
import { PostReview } from "../Reviews/PostReview";
import { ReviewCard } from "../Reviews/ReviewCard";
import { DeleteShop } from "./DeleteShop";
import OpenModalButton from "../OpenModalButton";
import "./ShopDetails.css";

export const ShopDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const shop = useSelector((state) => state.shops[id]);
  const user = useSelector((state) => state.session.user);
  const [generating, isGenerating] = useState(false);
  const [uploading, isUploading] = useState(false);
  const [deleting, isDeleting] = useState(false);
  const idType = "shop";
  const getRating = (shop) => {
    return shop.Reviews.reduce((a, c) => a + c.rating, 0) / shop.Reviews.length;
  };
  const reviewFind = shop?.Reviews?.find(
    (review) => review.user_id == user?.id
  );

  useEffect(() => {
    dispatch(thunkGetShops());
    dispatch(thunkGetShopImages());
  }, [dispatch, id, generating, uploading, deleting]);

  if (!shop) return <></>;
  return (
    <div className="shopdetails-container">
      <div className="shopdetails-imgdetails-container">
        <img
          className="shopdetails-image"
          src={
            shop?.ShopImages?.length
              ? shop?.ShopImages[0]?.image
              : "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
          }
        />
        <div className="shopdetails-container-text">
          <div className="shopdetails-name">{shop.name}</div>
          <div>{shop?.Reviews?.length ? getRating(shop) : "Not Rated"}</div>
          <div>{shop?.about}</div>
          <div>{shop?.policies}</div>
        </div>
      </div>
      {shop?.user_id == user?.id ? (
        <div className="shopdetails-utilities">
          {generating ||
          uploading ||
          shop?.ShopImages?.length ||
          shop?.user_id != user?.id ? (
            ""
          ) : (
            <ShopImageForm
              id={shop?.id}
              name={shop?.name}
              about={shop?.about}
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
          <Link to={`/shops/${shop?.id}/edit`}>
            <button className="shopdetails-button">EDIT SHOP</button>
          </Link>
          <OpenModalButton
            buttonText={"DELETE SHOP"}
            modalComponent={<DeleteShop id={shop.id} isDeleting={isDeleting} />}
          />
        </div>
      ) : (
        ""
      )}
      {reviewFind || shop?.user_id == user?.id ? (
        ""
      ) : user ? (
        <PostReview id={shop?.id} idType={idType} />
      ) : (
        ""
      )}
      <div>
        {shop?.Reviews?.length ? "Reviews:" : ""}
        {shop?.Reviews?.length ? shop?.Reviews?.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            id={shop.id}
            idType={idType}
          />
        )) : ""}
      </div>
      <div className="shopdetails-gallery-products">
        {shop?.Products?.map((product) => (
          <Link
            className="shopdetails-link"
            key={product?.id}
            to={`/products/${product?.id}`}
          >
            <div className="shopdetails-container-products">
              <img
                className="shopdetails-allimage"
                src={
                  product?.ProductImages[0]?.image ||
                  "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
                }
              />
              <div className="shopdetails-container-text">
                <div className="shopdetails-name">{product?.name}</div>
                <div>${product?.price.toFixed(2)}</div>
                <div>
                  {product?.Reviews.length ? getRating(product) : "Not Rated"}
                </div>
                <div>{product?.Category?.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
