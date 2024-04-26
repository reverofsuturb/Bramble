import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { thunkPostProduct, thunkPutProduct } from "../../store/products";
import { thunkGetShops } from "../../store/shops";
import { thunkGetCategories } from "../../store/categories";
import { useDispatch, useSelector } from "react-redux";
import { describe1, describe2, describe3 } from "./DetailsArrays";
import "./ProductForm.css";

export const ProductForm = ({ product, formType, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [details, setDetails] = useState(product?.details || "");
  const [detail1, setDetail1] = useState("");
  const [detail2, setDetail2] = useState("");
  const [detail3, setDetail3] = useState("");
  const [shipping, setShipping] = useState(product?.shipping || "");
  const [category, setCategory] = useState(product?.category_id || "");
  const [featured, setFeatured] = useState(product?.featured || false);
  const [shop, setShop] = useState(product?.shop_id || "");
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
      shop_id: shop == "" ? null : shop,
      category_id: category,
    };

    if (formType === "post") {
      const postProduct = await dispatch(thunkPostProduct(product));
      if (postProduct && postProduct.errors) {
        return setErrors(postProduct.errors);
      }
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

  useEffect(() => {
    if (detail1 || detail2 || detail3) setDetails(detail1 + detail2 + detail3);
  }, [detail1, detail2, detail3]);

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
      <span className="products-form-span">
        What would you like to name your product? The name will be used if you
        choose to generate an image for this item in the next screen.
      </span>
      <label className="products-form-label">
        DESCRIPTION
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="products-form-input"
          value={description}
          onBlur={(e) => setDescription(e.currentTarget.innerText)}
        >
          {description && description}
        </div>
      </label>
      {errors.description && <p className="error">{errors.description}</p>}
      <span className="products-form-span">
        How would you describe the product? This description will be used if you
        choose to generate an image for this item in the next screen.
      </span>
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
      <span className="products-form-span">How much does it cost?</span>
      <label className="products-form-label">
        DETAILS
        <div className="products-details-select">
          <div>{product?.details && `Current: ${product?.details}`}</div>
          <select
            className="products-form-select"
            type="text"
            value={detail1}
            onChange={(e) => {
              e.stopPropagation();
              setDetail1(e.currentTarget.value);
            }}
          >
            <option className="products-form-option" value="">
              Pick
            </option>
            {describe1.map((details1) => (
              <option
                key={details1}
                className="products-form-option"
                value={details1}
              >
                {details1}
              </option>
            ))}
          </select>
          <select
            className="products-form-select"
            type="text"
            value={detail2}
            onChange={(e) => {
              e.stopPropagation();
              setDetail2(e.currentTarget.value);
            }}
          >
            <option className="products-form-option" value="">
              Your
            </option>
            {describe2.map((details2) => (
              <option
                key={details2}
                className="products-form-option"
                value={details2}
              >
                {details2}
              </option>
            ))}
          </select>
          <select
            className="products-form-select"
            type="text"
            value={detail3}
            onChange={(e) => {
              e.stopPropagation();
              setDetail3(e.currentTarget.value);
            }}
          >
            <option className="products-form-option" value="">
              Details
            </option>
            {describe3.map((details3) => (
              <option
                key={details3}
                className="products-form-option"
                value={details3}
              >
                {details3}
              </option>
            ))}
          </select>
        </div>
      </label>
      {errors.details && <p className="error">{errors.details}</p>}
      <span className="products-form-span">Please choose three details</span>
      <label className="products-form-label">
        SHIPPING
        <select
          className="products-form-select"
          type="text"
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
        >
          <option className="products-form-option" value="">
            Choose One
          </option>
          <option className="products-form-option" value="Free Shipping">
            Free Shipping
          </option>
          <option className="products-form-option" value="Express Shipping">
            Express Shipping
          </option>
          <option className="products-form-option" value="Carrier Pigeon">
            Carrier Pigeon
          </option>
          <option className="products-form-option" value="Sloth Delivery">
            Sloth Delivery
          </option>
        </select>
      </label>
      {errors.shipping && <p className="error">{errors.shipping}</p>}
      <span className="products-form-span">Select shipping info here.</span>
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
          <span className="products-form-span">
            Will this item be specially featured?
          </span>
          <label className="products-form-label">
            SHOP
            <select
              className="products-form-select"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
            >
              <option className="products-form-option" value={""}>
                None
              </option>
              {filteredShops?.map((shop) => (
                <option
                  key={shop.id}
                  className="products-form-option"
                  value={shop.id}
                >
                  {shop.name}
                </option>
              ))}
            </select>
          </label>
          <span className="products-form-span">
            Which of your shops would this product belong to?
          </span>
        </>
      ) : (
        <Link className="products-form-link" to="/shops/new">
          Look&apos;s like you haven&apos;t made any shops to include a product
          in, if you would like to make a shop first click anywhere in this text
        </Link>
      )}
      <label className="products-form-label">
        CATEGORY
        <select
          className="products-form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {" "}
          <option value={""}>Select One</option>
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
      <span className="products-form-span">
        Which category best represents your product?
      </span>
      <button className="products-form-button">Submit</button>
    </form>
  );
};
