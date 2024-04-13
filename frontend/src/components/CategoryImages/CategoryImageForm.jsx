import { csrfFetch } from "../../store/csrf";
import { thunkGetCategoryImages } from "../../store/categoryimages";
import { useDispatch } from "react-redux";
import OpenAI from "openai";
import "./CategoryImageForm.css";

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

export const CategoryImageForm = ({ id, name, isGenerating }) => {
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState({});

  const blobFetcher = async (url) => {
    let fetchImage = await csrfFetch(`/api/categoryimages/fetchblob`, {
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
    isGenerating(true);
    let openai = await makeAi();
    let generateImage = await openai.images.generate({
      model: "dall-e-3",
      prompt: `This is a category called: ${name}, this image is meant to be a label symbolizing this category.`,
      n: 1,
      size: "1024x1024",
    });
    console.log(generateImage);

    let pngBlob = await blobFetcher(generateImage.data[0].url);
    console.log(pngBlob);

    await dispatch(thunkGetCategoryImages());
    isGenerating(false);
    return pngBlob;
  };

  return (
    <div className="catimg-container">
      <form className="catimg-form" onSubmit={handleSubmit}>
        <button className="catimg-button">Generate Image</button>
      </form>
    </div>
  );
};
