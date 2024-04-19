import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { thunkGetShops } from "../../store/shops";
import { thunkGetShopImages } from "../../store/shopimages";
import { ShopImageForm } from "../ShopImages/ShopImageForm";
import { PostReview } from "../Reviews/PostReview";
import { ReviewCard } from "../Reviews/ReviewCard";
import { DeleteShop } from "./DeleteShop";
import { FaRegStar } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton";
import "./ShopDetails.css";

export const ShopDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const shop = useSelector((state) => state.shops[id]);
  const user = useSelector((state) => state.session.user);
  const [generating, isGenerating] = useState(false);
  const [uploading, isUploading] = useState(false);
  const [deleting, isDeleting] = useState("");
  const idType = "shop";
  const getRating = (shop) => {
    return shop.Reviews.reduce((a, c) => a + c.rating, 0) / shop.Reviews.length;
  };
  const reviewFind = shop?.Reviews?.find(
    (review) => review.user_id == user?.id
  );

  let shopLength = shop?.Reviews?.length;

  useEffect(() => {
    dispatch(thunkGetShops());
    dispatch(thunkGetShopImages());
    isDeleting(false);
  }, [dispatch, id, generating, uploading, deleting, shopLength]);

  if (!shop) return <></>;
  return (
    <>
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
            <div className="shopdetails-name shopdetails-text">{shop.name}</div>
            <div className="shopdetails-text">{shop?.about}</div>
            <div className="shopdetails-text">
              {shop?.Reviews?.length ? (
                <>
                  {getRating(shop)} <FaRegStar />
                </>
              ) : (
                "Not Rated"
              )}
            </div>
            <div className="shopdetails-text">{shop?.policies}</div>
            <div
              className="shopdetails-text"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/categories/${shop?.Category?.id}`);
              }}
            >
              <span className="shopdetails-category">
                {shop?.Category?.name}
              </span>
            </div>
          </div>
        </div>
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
          {shop?.user_id == user?.id ? (
            <div className="shopdetails-edit-delete">
              <Link to={`/shops/${shop?.id}/edit`}>
                <button className="shopdetails-button">EDIT SHOP</button>
              </Link>
              <OpenModalButton
                buttonText={"DELETE SHOP"}
                css={"shopdetails-button"}
                modalComponent={
                  <DeleteShop id={shop.id} isDeleting={isDeleting} />
                }
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {reviewFind || shop?.user_id == user?.id ? (
          ""
        ) : user ? (
          <OpenModalButton
            buttonText={"Add Review"}
            css={"shopdetails-button"}
            modalComponent={<PostReview id={shop?.id} idType={idType} />}
          />
        ) : (
          ""
        )}
        <div className="shopdetails-reviews-container">
          {shop?.Reviews?.length ? (
            <div className="shopdetails-text">Reviews: </div>
          ) : (
            ""
          )}

          <div className="shopdetails-reviews-gallery">
            {shop?.Reviews?.length
              ? shop?.Reviews?.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    id={shop.id}
                    idType={idType}
                    isDeleting={isDeleting}
                  />
                ))
              : ""}
          </div>
        </div>
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
              <div className="shopdetails-product-container-text">
                <div className="shopdetails-product-name">{product?.name}</div>
                <div className="shopdetails-product-price">
                  ${product?.price.toFixed(2)}
                </div>
                <div className="shopdetails-product-rating">
                  {product?.Reviews?.length ? (
                    <>
                      {getRating(product)} <FaRegStar />{" "}
                    </>
                  ) : (
                    "Not Rated"
                  )}
                </div>
                <div
                  className="shopdetails-products-category"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/categories/${product?.Category?.id}`);
                  }}
                >
                  {product?.Category?.name}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
