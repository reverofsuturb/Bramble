import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetProducts, thunkDeleteProduct } from "../../store/products";
import { useNavigate } from "react-router-dom";
import "./DeleteProduct.css"

export const DeleteProduct = ({ id }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="delete-product-modal">
      <h2 className="delete-product-header">CONFIRM DELETE</h2>
      <button
        className="delete-product-button"
        onClick={() => {
          dispatch(thunkDeleteProduct(id));
          dispatch(thunkGetProducts());
          closeModal();
          navigate("/products");
        }}
      >
        Yes
      </button>
      <button className="delete-product-button" onClick={closeModal}>
        {" "}
        No{" "}
      </button>
    </div>
  );
};
