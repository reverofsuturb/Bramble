import { useState } from "react";
import {
  thunkGetProductImages,
  thunkPostProductImage,
} from "../../store/productimages";
import { useDispatch } from "react-redux";
import OpenAI from "openai";

const OPEN_API_KEY = process.env.OPEN_API_KEY;
const openai = new OpenAI({
  apiKey: OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const ProductImageForm = ({ id, description }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  console.log(id, description)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      let image = await openai.images.generate({
        model: "dall-e-3",
        prompt: description,
        n: 1,
        size: "1024x1024",
        // headers: { Authorization: `Bearer ${OPEN_API_KEY}` },
      });
      console.log(image);
      image = response.data.data[0];
    }
    console.log(image);
    const productImage = await dispatch(thunkPostProductImage(id, image));
    console.log(productImage);
    if (productImage && productImage.errors) {
      console.log(productImage);
      return productImage.errors;
    }
    dispatch(thunkGetProductImages());
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Submit your own image:
          <input type="file" onChange={updateFile} />
        </label>
        <button>Submit</button>
      </form>
      <form onSubmit={handleSubmit}>
        <label>
          Generate a unique image for this product based on it's description
        </label>
        <button>Generate</button>
      </form>
    </>
  );
};
