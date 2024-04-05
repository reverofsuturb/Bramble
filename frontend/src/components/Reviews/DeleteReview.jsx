import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";
import { thunkGetProducts } from "../../store/products";
import "./DeleteReview.css";

export const DeleteReview = ({ id }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  return (
    <div className="delete-review-modal">
      <h2 className="delete-review-header">CONFIRM DELETE</h2>
      <button
        className="delete-review-button"
        onClick={() => {
          dispatch(thunkDeleteReview(id));
          dispatch(thunkGetProducts());
          closeModal();
        }}
      >
        Yes
      </button>
      <button className="delete-review-button" onClick={closeModal}>
        No
      </button>
    </div>
  );
};
