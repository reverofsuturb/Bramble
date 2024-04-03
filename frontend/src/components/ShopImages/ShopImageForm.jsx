import { csrfFetch } from "../../store/csrf";
import { useState } from "react";
import { thunkGetShopImages, thunkPostShopImage } from "../../store/shopimages";
import { useDispatch } from "react-redux";
import OpenAI from "openai";

const OPEN_API_KEY = process.env.OPEN_API_KEY;
const openai = new OpenAI({
  apiKey: OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const ShopImageForm = ({
  id,
  name,
  about,
  isGenerating,
  isUploading,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

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
