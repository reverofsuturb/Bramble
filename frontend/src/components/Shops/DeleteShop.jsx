import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetShops, thunkDeleteShop } from "../../store/shops";
import { useNavigate } from "react-router-dom";
import "./DeleteShop.css"

export const DeleteShop = ({ id }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="delete-shop-modal">
      <h2 className="delete-shop-header">CONFIRM DELETE</h2>
      <button className="delete-shop-button"
        onClick={() => {
          dispatch(thunkDeleteShop(id));
          dispatch(thunkGetShops());
          closeModal();
          navigate("/shops");
        }}
      >
        Yes
      </button>
      <button className="delete-shop-button" onClick={closeModal}> No </button>
    </div>
  );
};
