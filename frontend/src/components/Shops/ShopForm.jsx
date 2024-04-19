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
      category_id: category,
    };
    console.log(shop);
    if (formType === "post") {
      const postShop = await dispatch(thunkPostShop(shop));
      if (postShop && postShop.errors) {
        return setErrors(postShop.errors);
      }
      navigate(`/shops/${postShop.id}`);
    } else if (formType === "put") {
      const putShop = await dispatch(thunkPutShop(id, shop));
      if (putShop && putShop.errors) {
        return setErrors(putShop.errors);
      }
      navigate(`/shops/${id}`);
    }
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
      {errors.name && <p className="error">{errors.name}</p>}
      <span className="products-form-span">
        What would you like to name your shop? The name will be used if you
        choose to generate an image for this item in the next screen.
      </span>
      <label className="shops-form-label">
        ABOUT
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="shops-form-input"
          value={about}
          onBlur={(e) => setAbout(e.currentTarget.innerText)}
        >
          {about && about}
        </div>
      </label>
      {errors.about && <p className="error">{errors.about}</p>}
      <span className="products-form-span">
        What can you tell us about your store? This section will be used if you
        choose to generate an image for this store in the next screen.
      </span>
      <label className="shops-form-label">
        POLICIES
        <textarea
          className="shops-form-input"
          type="text"
          value={policies}
          onChange={(e) => setPolicies(e.target.value)}
        />
      </label>
      {errors.policies && <p className="error">{errors.policies}</p>}
      <span className="shops-form-span">
        Place pertinent policies here.
      </span>
      <label className="shops-form-label">
        CATEGORY
        <select
          className="shops-form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {" "}
          <option value={""}>Select One</option>
          {categories?.map((category) => (
            <option
              key={category.id}
              className="shops-form-option"
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </label>
      {errors.category_id && <p className="error">{errors.category_id}</p>}
      <span className="shops-form-span">
        Which category best represents your shop?
      </span>
      <button className="shops-form-button">Submit</button>
    </form>
  );
};
