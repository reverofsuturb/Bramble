import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { thunkPostProduct, thunkPutProduct } from "../../store/products";
import { thunkGetShops } from "../../store/shops";
import { thunkGetCategories } from "../../store/categories";
import { useDispatch, useSelector } from "react-redux";
import "./ProductForm.css";

export const ProductForm = ({ product, formType, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [details, setDetails] = useState(product?.details || "");
  const [shipping, setShipping] = useState(product?.shipping || "");
  const [category, setCategory] = useState(product?.category_id || "");
  const [featured, setFeatured] = useState(product?.featured || false);
  const [shop, setShop] = useState(product?.shop_id || null);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user);
  const categoriesObj = useSelector((state) => state.categories);
  const shopsObj = useSelector((state) => state.shops);
  const categories = Object.values(categoriesObj);
  const shops = Object.values(shopsObj);

  const shopFind = shops?.find((shop) => shop.user_id === user?.id);
  const filteredShops = shops?.filter((shop) => shop.user_id === user?.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const product = {
      name,
      price: parseFloat(price),
      description,
      details,
      shipping,
      featured,
      shop_id: shop,
      category_id: category,
    };
    console.log(product);

    if (formType === "post") {
      const postProduct = await dispatch(thunkPostProduct(product));
      if (postProduct && postProduct.errors) {
        return setErrors(postProduct.errors);
      }
      console.log(postProduct);
      navigate(`/products/${postProduct.id}`);
    } else if (formType === "put") {
      const putProduct = await dispatch(thunkPutProduct(id, product));
      if (putProduct && putProduct.errors) {
        return setErrors(putProduct.errors);
      }
      navigate(`/products/${id}`);
    }
  };
  useEffect(() => {
    dispatch(thunkGetShops());
    dispatch(thunkGetCategories());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="products-form">
      <label className="products-form-label">
        NAME
        <input
          className="products-form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {errors.name && <p className="error">{errors.name}</p>}
      <label className="products-form-label">
        PRICE
        <input
          className="products-form-input"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      {errors.price && <p className="error">{errors.price}</p>}
      <label className="products-form-label">
        DESCRIPTION
        <textarea
          className="products-form-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      {errors.description && <p className="error">{errors.description}</p>}
      <label className="products-form-label">
        DETAILS
        <textarea
          className="products-form-input"
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </label>
      {errors.details && <p className="error">{errors.details}</p>}
      <label className="products-form-label">
        SHIPPING
        <textarea
          className="products-form-input"
          type="text"
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
        />
      </label>
      {errors.shipping && <p className="error">{errors.shipping}</p>}
      {shopFind ? (
        <>
          <label className="products-form-label">
            FEATURED
            <select
              className="products-form-select"
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
            >
              <option className="products-form-option" value={true}>
                True
              </option>
              <option className="products-form-option" value={false}>
                False
              </option>
            </select>
          </label>
          <label className="products-form-label">
            SHOP
            <select
              className="products-form-select"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
            >
              {filteredShops?.map((shop) => (
                <option
                  key={shop.id}
                  className="products-form-option"
                  value={shop.id}
                >
                  {shop.name}
                </option>
              ))}
              <option className="products-form-option" value={null}>
                No Shop
              </option>
            </select>
          </label>
        </>
      ) : (
        ""
      )}
      <label className="products-form-label">
        CATEGORY
        <select
          className="products-form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories?.map((category) => (
            <option
              key={category.id}
              className="products-form-option"
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </label>
      {errors.category_id && <p className="error">{errors.category_id}</p>}
      <button className="products-form-button">Submit</button>
    </form>
  );
};
