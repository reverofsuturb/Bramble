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

//this function is fetching from the created ai-art and converting it into a blob (binary large object), needed to set a no-cors header to avoid error
// this is not working on front end attempting to use in backend via proxy
// const imageHelper = async (url) => {
//   try {
//     let file = await fetch(url, {
//     });
//     return file.blob();
//   } catch (err) {
//     console.error(err);
//   }
// };

// const pngHelper = async (blob) => {
//   //image constructor, pass blob to html image constructor, assign blob as the src using createObjectURL from the URL interface
//   let png = new Image();
//   png.src = URL.createObjectURL(blob);
//   await png.onload;
//   //instantiate an html canvas element, ctx is used to render a 2d context and draw the image constructor which is using the blob for image info
//   const canvas = document.createElement("canvas");
//   canvas.width = png.width;
//   canvas.height = png.height;
//   const ctx = canvas.getContext("2d");
//   ctx.drawImage(png, 0, 0);
//   let pngBlob = await canvas.toBlob(png, "image/png");
//   // creates a new file instance for s3 upload, uses the blob created from the canvas to ensure png
//   let pngFile = new File([pngBlob], "generatedimage.png", {
//     type: "image/png",
//   });
//   return pngFile;
// };
const fileHelper = (blob) => {
  let pngFile = new File([pngBlob], "generatedimage.png", {
    type: "image/png",
  });
  return pngFile;
};

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

  console.log(id, description);

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
      // let pngImage = await fileHelper(pngBlob);
      // console.log(pngImage)

      // let png = new File([pngImage], "generatedimage.png", {
      //   type: "image/png",
      // });
      // console.log(png)
      //   return png;
      // let formData = new FormData();
      // formData.append("file", pngImage, "upload.png");

      // let uploadImage = pngHelper(imageBlob);

      // console.log(uploadImage);

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
