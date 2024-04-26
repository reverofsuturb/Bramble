import { useState } from "react";
import { csrfFetch } from "../../store/csrf";
import {
  thunkGetProductImages,
  thunkPostProductImage,
} from "../../store/productimages";
import { useDispatch } from "react-redux";
import OpenAI from "openai";
import "./ProductImageForm.css";
const keyFetch = async () => {
  try {
    const res = await csrfFetch("/api/productimages/api-key");
    const key = await res.json();
    return key;
  } catch (err) {
    console.error(err);
  }
};

const makeAi = async () => {
  try {
    const key = await keyFetch();
    const openai = new OpenAI({
      apiKey: key.key,
      dangerouslyAllowBrowser: true,
    });
    return openai;
  } catch (err) {
    console.error(err);
  }
};

makeAi();

export const ProductImageForm = ({
  id,
  name,
  description,
  isGenerating,
  isUploading,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  // const [errors, setErrors] = useState({});

  const blobFetcher = async (url) => {
    let fetchImage = await csrfFetch(`/api/productimages/fetchblob`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url, id: id }),
    });
    if (fetchImage && fetchImage.errors) {
      return fetchImage.errors;
    }

    return fetchImage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      isGenerating(true);
      let openai = await makeAi();
      let generateImage = await openai.images.generate({
        model: "dall-e-3",
        prompt: `This is a product called: ${name}, this is a description of the product: ${description}`,
        n: 1,
        size: "1024x1024",
      });
      console.log(generateImage); //keep

      let pngBlob = await blobFetcher(generateImage.data[0].url);

      await dispatch(thunkGetProductImages());
      isGenerating(false);
      return pngBlob;
    } else {
      isUploading(true);
      const productImage = await dispatch(thunkPostProductImage(id, image));

      if (productImage && productImage.errors) {
        return productImage.errors;
      }
      await dispatch(thunkGetProductImages());
      isUploading(false);
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="proimg-container">
      <form className="proimg-form" onSubmit={handleSubmit}>
        <label className="proimg-label">
          Submit your own image:
          <input
            className="proimg-file-input"
            type="file"
            onChange={updateFile}
          />
          <button
            className="proimg-button"
            disabled={image === null ? true : false}
          >
            Submit
          </button>
        </label>
      </form>
      <form className="proimg-form" onSubmit={handleSubmit}>
        <label className="proimg-label">
          Generate a unique image for this product based on it&apos;s
          description
        </label>
        <button className="proimg-button">Generate</button>
      </form>
    </div>
  );
};
