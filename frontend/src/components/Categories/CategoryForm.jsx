import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkPostCategory, thunkPutCategory } from "../../store/categories";
import { useDispatch } from "react-redux";

export const CategoryForm = ({ id, formType, category, setEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(category?.name || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = {
      name,
    };
    console.log(category);

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
    navigate("/categories");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NAME:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button>Submit</button>
    </form>
  );
};
