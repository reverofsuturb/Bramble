import { csrfFetch } from "../../store/csrf";
import { useState } from "react";
import { thunkGetShopImages, thunkPostShopImage } from "../../store/shopimages";
import { useDispatch } from "react-redux";
import OpenAI from "openai";
import "./ShopImageForm.css";

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
// .then((openai) => {
//   console.log(openai);
// })
// .catch((error) => console.error(error));

export const ShopImageForm = ({
  id,
  name,
  about,
  isGenerating,
  isUploading,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  // const [errors, setErrors] = useState({});

  const blobFetcher = async (url) => {
    let fetchImage = await csrfFetch(`/api/shopimages/fetchblob`, {
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
        prompt: `This is a shop called: ${name}, this is a description of the shop: ${about}`,
        n: 1,
        size: "1024x1024",
      });
      console.log(generateImage);

      let pngBlob = await blobFetcher(generateImage.data[0].url);
      console.log(pngBlob);

      await dispatch(thunkGetShopImages());
      isGenerating(false);
      return pngBlob;
    } else {
      isUploading(true);
      const shopImage = await dispatch(thunkPostShopImage(id, image));
      console.log(shopImage);
      if (shopImage && shopImage.errors) {
        console.log(shopImage);
        return shopImage.errors;
      }
      await dispatch(thunkGetShopImages());
      isUploading(false);
    }
  };
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="shoimg-container">
      <form className="shoimg-form" onSubmit={handleSubmit}>
        <label className="shoimg-label">
          Submit your own image:
          <input
            className="shoimg-file-input"
            type="file"
            onChange={updateFile}
          />
          <button
            className="shoimg-button"
            disabled={image === null ? true : false}
          >
            Submit
          </button>
        </label>
      </form>
      <form className="shoimg-form" onSubmit={handleSubmit}>
        <label className="shoimg-label">
          Generate a unique image for this product based on it&apos;s
          description
        </label>
        <button className="shoimg-button">Generate</button>
      </form>
    </div>
  );
};
