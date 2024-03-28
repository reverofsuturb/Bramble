import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ShopForm } from "./ShopForm";
import { thunkGetShops } from "../../store/shops";

export const PutShop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shops[id]);
  const formType = "put";

  useEffect(() => {
    dispatch(thunkGetShops());
  }, [dispatch]);

  if (shop) {
    return <ShopForm shop={shop} formType={formType} id={id} />;
  } else {
    return <></>;
  }
};
