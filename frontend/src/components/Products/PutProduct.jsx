import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductForm } from "./ProductForm";
import { thunkGetProducts } from "../../store/products";

export const PutProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products[id]);
  const formType = "put";

  useEffect(() => {
    dispatch(thunkGetProducts());
  }, [dispatch]);

  if (product) {
    return <ProductForm product={product} formType={formType} id={id} />;
  } else {
    return <></>;
  }
};
