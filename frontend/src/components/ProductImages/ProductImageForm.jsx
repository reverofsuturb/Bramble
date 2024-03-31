import { useState } from "react";
import {
  thunkGetProductImages,
  thunkPostProductImage,
} from "../../store/productimages";
import { useDispatch } from "react-redux";

export const ProductImageForm = ({ id }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image)
    const productImage = await dispatch(thunkPostProductImage(id, image));
    console.log(productImage)
    if (productImage && productImage.errors) {
      console.log(productImage)
      return productImage.errors;
    }
    dispatch(thunkGetProductImages());
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
