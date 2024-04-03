import { useState } from "react";
import { csrfFetch } from "../../store/csrf";
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

  const blobFetcher = async (url) => {
    let fetchImage = await csrfFetch(`api/productimages/fetchblob`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });
    if (fetchImage && fetchImage.errors) {
      console.log(fetchImage);
      return fetchImage.errors;
    }
    console.log(fetchImage);
    return fetchImage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      let generateImage = await openai.images.generate({
        model: "dall-e-3",
        prompt: description,
        n: 1,
        size: "1024x1024",
      });
      console.log(generateImage);

      let pngBlob = await blobFetcher(generateImage.data[0].url);
      console.log(pngBlob);

      dispatch(thunkGetProductImages());
      return pngBlob;
    } else {
      console.log(image);
      const productImage = await dispatch(thunkPostProductImage(id, image));
      console.log(productImage);
      if (productImage && productImage.errors) {
        console.log(productImage);
        return productImage.errors;
      }
      dispatch(thunkGetProductImages());
    }
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
