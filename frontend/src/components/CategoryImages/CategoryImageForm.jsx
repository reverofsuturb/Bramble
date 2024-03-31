import { useState } from "react";
import {
  thunkGetCategoryImages,
  thunkPostCategoryImage,
} from "../../store/categoryimages";
import { useDispatch } from "react-redux";

export const CategoryImageForm = ({ id }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    const categoryImage = await dispatch(thunkPostCategoryImage(id, image));
    console.log(categoryImage);
    if (categoryImage && categoryImage.errors) {
      console.log(categoryImage);
      return categoryImage.errors;
    }
    dispatch(thunkGetCategoryImages());
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        IMAGE:
        <input type="file" onChange={updateFile} />
      </label>
      <button>Submit</button>
    </form>
  );
};
