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

  useEffect(() => {
    dispatch(thunkGetShops());
  }, [dispatch]);

  return (
    <div>
      {shops?.map((shop) => (
        <div key={shop.id} className="shops-container">
          <div>{shop.name}</div>
          <div>{shop.about}</div>
          <div>{shop.policies}</div>
          <div>{shop.category_id}</div>
          <Link to={`/shops/${shop.id}`}>EDIT</Link>
          <button onClick={() => dispatch(thunkDeleteShop(shop.id))}>
            DELETE
          </button>
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
        </div>
      ))}
    </div>
  );
};
