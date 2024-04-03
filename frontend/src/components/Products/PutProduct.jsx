import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ProductForm } from "./ProductForm";
import { thunkGetProducts } from "../../store/products";

export const PutProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products[id]);
  const user = useSelector((state) => state.session.user);
  const formType = "put";

  useEffect(() => {
    dispatch(thunkGetProducts());
  }, [dispatch]);
  if (user?.id != product?.user_id) return navigate("/products");
  if (product) {
    return <ProductForm product={product} formType={formType} id={id} />;
  } else {
    return <></>;
  }
};
