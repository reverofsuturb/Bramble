import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetProducts, thunkDeleteProduct } from "../../store/products";
import "./GetAllProducts.css";

export const GetAllProducts = () => {
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);

  useEffect(() => {
    dispatch(thunkGetProducts());
  }, [dispatch]);
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="products-container">
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.description}</div>
          <div>{product.details}</div>
          <div>{product.shipping}</div>
          <button onClick={() => dispatch(thunkDeleteProduct(product.id))}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
};
