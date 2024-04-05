import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetShops } from "../../store/shops";
import { Link } from "react-router-dom";

import "./GetAllShops.css";

export const GetAllShops = () => {
  const dispatch = useDispatch();
  const [userShops, setUserShops] = useState(false);
  const user = useSelector((state) => state.session.user);
  const shopsObj = useSelector((state) => state.shops);
  const shops = Object.values(shopsObj);
  const myShops = shops?.filter((shop) => shop?.user_id === user?.id);

  const getRating = (shop) => {
    return shop.Reviews.reduce((a, c) => a + c.rating, 0) / shop.Reviews.length;
  };

  useEffect(() => {
    dispatch(thunkGetShops());
  }, [dispatch]);

  return (
    <div className="shops-button-div">
      {user && (
        <button
          className="shops-button-filter"
          onClick={() => setUserShops(!userShops)}
        >
          {userShops ? "Show All Shops" : "Show Only Your Shops"}
        </button>
      )}
      <div className="shops-gallery">
        {userShops ? (
          myShops?.length ? (
            myShops?.map((shop) => (
              <Link
                className="shops-link"
                key={shop.id}
                to={`/shops/${shop.id}`}
              >
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
                      Rating:{" "}
                      {shop?.Reviews?.length ? getRating(shop) : "Not Rated"}
                    </div>
                    <div className="shops-text">Policies: {shop?.policies}</div>
                    <div>
                      {shop?.Category?.name &&
                        `Category: ${shop?.Category?.name}`}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h2> You haven&apos;t made any shops yet!</h2>
          )
        ) : (
          shops?.map((shop) => (
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
                    Rating:{" "}
                    {shop?.Reviews?.length ? getRating(shop) : "Not Rated"}
                  </div>
                  <div className="shops-text">Policies: {shop?.policies}</div>
                  <div>
                    {shop?.Category?.name && `Category: ${shop?.Category?.name}`}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
