import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ShopForm } from "./ShopForm";
import { thunkGetShops } from "../../store/shops";

export const PutShop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shop = useSelector((state) => state.shops[id]);
  const user = useSelector((state) => state.session.user);
  const formType = "put";

  useEffect(() => {
    dispatch(thunkGetShops());
  }, [dispatch]);
  if (user?.id != shop?.user_id) return navigate("/shops");
  if (shop) {
    return <ShopForm shop={shop} formType={formType} id={id} />;
  } else {
    return <></>;
  }
};
