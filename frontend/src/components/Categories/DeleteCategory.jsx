import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  thunkGetCategories,
  thunkDeleteCategory,
} from "../../store/categories";
import { useNavigate } from "react-router-dom";
import "./DeleteCategory.css";

export const DeleteCategory = ({ id }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="delete-category-modal">
      <h2 className="delete-category-header">CONFIRM DELETE</h2>
      <button
        className="delete-category-button"
        onClick={() => {
          dispatch(thunkDeleteCategory(id));
          dispatch(thunkGetCategories());
          closeModal();
          navigate("/categories");
        }}
      >
        Yes
      </button>
      <button className="delete-category-button" onClick={closeModal}>
        No
      </button>
    </div>
  );
};
