import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetShops, thunkDeleteShop } from "../../store/shops";
import { Link } from "react-router-dom";
import { PostReview } from "../Reviews/PostReview";
import { ReviewCard } from "../Reviews/ReviewCard";
import { ShopImageForm } from "../ShopImages/ShopImageForm";

import "./GetAllShops.css";

export const GetAllShops = () => {
  const dispatch = useDispatch();
  const shopsObj = useSelector((state) => state.shops);
  const shops = Object.values(shopsObj);
  const idType = "shop";

  const getRating = (shop) => {
    return shop.Reviews.reduce((a, c) => a + c.rating, 0) / shop.Reviews.length;
  };

  useEffect(() => {
    dispatch(thunkGetShops());
  }, [dispatch]);

  return (
    <div className="shops-gallery">
      {shops?.map((shop) => (
        <Link className="shops-link" key={shop.id} to={`/shops/${shop.id}`}>
          <div key={shop?.id} className="shops-container">
            <img
              src={
                shop?.ShopImages?.length
                  ? shop?.ShopImages[0]?.image
                  : "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
              }
              className="shops-allimage"
            />
            <div className="shops-container-text">
              <div className="shops-name">{shop.name}</div>
              <div>
                Rating: {shop?.Reviews?.length ? getRating(shop) : "Not Rated"}
              </div>
              <div>Policies: {shop?.policies}</div>
              <div>Category: {shop?.Category?.name}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
