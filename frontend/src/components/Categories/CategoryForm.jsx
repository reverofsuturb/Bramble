import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkPostCategory, thunkPutCategory } from "../../store/categories";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CategoryForm.css";

export const CategoryForm = ({ id, formType, category, setEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(category?.name || "");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const category = {
      name,
    };

    if (formType === "post") {
      const postCategory = await dispatch(thunkPostCategory(category));
      if (postCategory && postCategory.errors) {
        return setErrors(postCategory.errors);
      }
    } else if (formType === "put") {
      const putCategory = await dispatch(thunkPutCategory(id, category));
      if (putCategory && putCategory.errors) {
        return setErrors(putCategory.errors);
      }
    }
    setEditing(false);
    closeModal();
    navigate("/categories");
  };

  return (
    <div className="categories-form-container">
      <form className="categories-form" onSubmit={handleSubmit}>
        <label className="categories-form-label">
          NAME:
          <input
            className="categories-form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button className="categories-form-button" type="submit">
          Submit
        </button>
      </form>
      {errors.name && <p className="error">{errors.name}</p>}
    </div>
  );
};
