import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  thunkPostProduct,
  thunkPutProduct,
} from "../../store/products";
import { useDispatch } from "react-redux";
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
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price: parseFloat(price),
      description,
      details,
      shipping,
      category_id: category,
    };
    console.log(product);

    if (formType === "post") {
      const postProduct = await dispatch(thunkPostProduct(product));
      if (postProduct && postProduct.errors) {
        return setErrors(postProduct.errors);
      }
    } else if (formType === "put") {
      const putProduct = await dispatch(thunkPutProduct(id, product));
      if (putProduct && putProduct.errors) {
        return setErrors(putProduct.errors);
      }
    }
    navigate("/products")
  };

  return (
    <form onSubmit={handleSubmit} className="products-form">
      <label>
        NAME:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        PRICE:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        DESCRIPTION
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        DETAILS
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </label>
      <label>
        SHIPPING
        <input
          type="text"
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
        />
      </label>
      <label>
        CATEGORY
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