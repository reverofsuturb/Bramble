import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { thunkGetShops } from "../../store/shops";
import { ShopImageForm } from "../ShopImages/ShopImageForm";
import { PostReview } from "../Reviews/PostReview";
import { ReviewCard } from "../Reviews/ReviewCard";
import "./ShopDetails.css";

export const ShopDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const shop = useSelector((state) => state.shops[id]);
  const user = useSelector((state) => state.session.user);
  const idType = "shop";

  const getRating = (shop) => {
    return shop.Reviews.reduce((a, c) => a + c.rating, 0) / shop.Reviews.length;
  };

  useEffect(() => {
    dispatch(thunkGetShops());
  }, [dispatch, id]);

  if (!shop) return <>/</>;
  return (
    <div className="shopdetails-container">
      <div className="shopdetails-imgdetails-container">
        <img className="shopdetails-image" src={shop?.ShopImages[0].image} />
        <div className="shopdetails-container-text">
          <div className="shopdetails-name">{shop.name}</div>
          <div>{shop.Reviews.length ? getRating(shop) : "Not Rated"}</div>
          <div>{shop.about}</div>
          <div>{shop.policies}</div>
        </div>
      </div>
      {shop.user_id === user.id ? (
        <div className="shopdetails-utilities">
          <ShopImageForm id={shop.id} name={shop.name} about={shop.about} />
          <Link to={`/shops/${shop.id}/edit`}>
            <button className="shopdetails-button">EDIT SHOP</button>
          </Link>
          <button
            className="shopdetails-button"
            onClick={() => dispatch(thunkDeleteShop(shop.id))}
          >
            DELETE SHOP
          </button>
        </div>
      ) : (
        ""
      )}
      <PostReview id={shop.id} idType={idType} />
      <div>
        {shop.Reviews?.length ? "Reviews:" : ""}
        {shop.Reviews?.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            id={shop.id}
            idType={idType}
          />
        ))}
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
                src={product?.ProductImages[0].image}
              />
              <div className="shopdetails-container-text">
                <div className="shopdetails-name">{product.name}</div>
                <div>${product?.price.toFixed(2)}</div>
                <div>
                  {product?.Reviews.length ? getRating(product) : "Not Rated"}
                </div>
                <div>{product?.Category.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
