import { useState } from "react";
import { thunkGetShopImages, thunkPostShopImage } from "../../store/shopimages";
import { useDispatch } from "react-redux";

export const ShopImageForm = ({ id }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    const shopImage = await dispatch(thunkPostShopImage(id, image));
    console.log(shopImage);
    if (shopImage && shopImage.errors) {
      console.log(shopImage);
      return shopImage.errors;
    }
    dispatch(thunkGetShopImages());
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
