import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetShops, thunkDeleteShop } from "../../store/shops";
import { Link } from "react-router-dom";
import "./GetAllShops.css";

export const GetAllShops = () => {
  const dispatch = useDispatch();
  const shopsObj = useSelector((state) => state.shops);
  const shops = Object.values(shopsObj);

  useEffect(() => {
    dispatch(thunkGetShops());
  }, [dispatch]);

  return (
    <div>
      {shops.map((shop) => (
        <div key={shop.id} className="shops-container">
          <div>{shop.name}</div>
          <div>{shop.about}</div>
          <div>{shop.policies}</div>
          <div>{shop.items}</div>
          <div>{shop.featured}</div>
          <div>{shop.category_id}</div>
          <Link to={`/shops/${shop.id}`}>EDIT</Link>
          <button onClick={() => dispatch(thunkDeleteShop(shop.id))}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
};
