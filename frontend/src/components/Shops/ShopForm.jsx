import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  thunkPostShop,
  thunkPutShop,

} from "../../store/shops";
import { useDispatch } from "react-redux";
import "./ShopForm.css";

export const ShopForm = ({ shop, formType, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(shop?.name || "");
  const [about, setAbout] = useState(shop?.about || "");
  const [policies, setPolicies] = useState(shop?.policies || "");
  const [items, setItems] = useState(shop?.items || "");
  const [featured, setFeatured] = useState(shop?.featured || "");
  const [category, setCategory] = useState(shop?.category_id || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shop = {
      name,
      about,
      policies,
      items,
      featured,
      category_id: category,
    };
    console.log(shop);
    if (formType === "post") {
      const postShop = await dispatch(thunkPostShop(shop));
      if (postShop && postShop.errors) {
        return setErrors(postProduct.errors);
      }
    } else if (formType === "put") {
      const putShop = await dispatch(thunkPutShop(id, shop));
      if (putShop && putShop.errors) {
        return setErrors(putShop.errors);
      }
    }
    navigate("/shops")
  };

  return (
    <form onSubmit={handleSubmit} className="shops-form">
      <label>
        NAME:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        ABOUT:
        <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </label>
      <label>
        POLICIES:
        <input
          type="text"
          value={policies}
          onChange={(e) => setPolicies(e.target.value)}
        />
      </label>
      <label>
        ITEMS:
        <input
          type="number"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
      </label>
      <label>
        FEATURED:
        <input
          type="number"
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
        />
      </label>
      <label>
        CATEGORY:
        <input
          type="number"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};
