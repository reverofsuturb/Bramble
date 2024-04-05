import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";
import { thunkGetProducts } from "../../store/products";
import { thunkGetShops } from "../../store/shops";
import "./DeleteReview.css";

export const DeleteReview = ({ id, isDeleting }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  isDeleting(true);
  return (
    <div className="delete-review-modal">
      <h2 className="delete-review-header">CONFIRM DELETE</h2>
      <button
        className="delete-review-button"
        onClick={() => {
          dispatch(thunkDeleteReview(id));
          dispatch(thunkGetProducts());
          dispatch(thunkGetShops());
          isDeleting(false);
          closeModal();
        }}
      >
        Yes
      </button>
      <button
        className="delete-review-button"
        onClick={() => {
          isDeleting(false);
          closeModal();
        }}
      >
        No
      </button>
    </div>
  );
};
