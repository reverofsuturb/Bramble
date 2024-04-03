import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { thunkPostShop, thunkPutShop } from "../../store/shops";
import { thunkGetCategories } from "../../store/categories";
import { useDispatch, useSelector } from "react-redux";
import "./ShopForm.css";

export const ShopForm = ({ shop, formType, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(shop?.name || "");
  const [about, setAbout] = useState(shop?.about || "");
  const [policies, setPolicies] = useState(shop?.policies || "");
  const [category, setCategory] = useState(shop?.category_id || "");
  const [errors, setErrors] = useState({});
  const categoriesObj = useSelector((state) => state.categories);
  const categories = Object.values(categoriesObj);

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
    navigate("/shops");
  };

  useEffect(() => {
    dispatch(thunkGetCategories());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="shops-form">
      <label className="shops-form-label">
        NAME
        <input
          className="shops-form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="shops-form-label">
        ABOUT
        <input
          className="shops-form-input"
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </label>
      <label className="shops-form-label">
        POLICIES
        <input
          className="shops-form-input"
          type="text"
          value={policies}
          onChange={(e) => setPolicies(e.target.value)}
        />
      </label>
      <label className="shops-form-label">
        CATEGORY
        <select
          className="shops-form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option className="shops-form-option" value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <button className="shops-form-button">Submit</button>
    </form>
  );
};
