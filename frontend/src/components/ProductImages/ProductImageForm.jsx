import { useState } from "react";
import { csrfFetch } from "../../store/csrf";
import {
  thunkGetProductImages,
  thunkPostProductImage,
} from "../../store/productimages";
import { useDispatch } from "react-redux";
import OpenAI from "openai";

const keyFetch = async () => {
  try {
    const res = await csrfFetch("/api/productimages/api-key");
    const key = await res.json();
    console.log(key);
    return key;
  } catch (err) {
    console.error(err);
  }
};

const makeAi = async () => {
  try {
    const key = await keyFetch();
    console.log(key, "key");
    const openai = new OpenAI({
      apiKey: key.key,
      dangerouslyAllowBrowser: true,
    });
    return openai;
  } catch (err) {
    console.error(err);
  }
};

makeAi()
  .then((openai) => {
    console.log(openai);
  })
  .catch((error) => console.error(error));

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
      console.log(fetchImage);
      return fetchImage.errors;
    }
    console.log(fetchImage);
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
      console.log(generateImage);

      let pngBlob = await blobFetcher(generateImage.data[0].url);
      console.log(pngBlob);

      await dispatch(thunkGetProductImages());
      isGenerating(false);
      return pngBlob;
    } else {
      console.log(image);
      isUploading(true);
      const productImage = await dispatch(thunkPostProductImage(id, image));
      console.log(productImage);
      if (productImage && productImage.errors) {
        console.log(productImage);
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
          Generate a unique image for this product based on it&apos;s
          description
        </label>
        <button>Generate</button>
      </form>
    </>
  );
};
