import { useState } from "react";
import { thunkPostReview, thunkPutReview } from "../../store/reviews";
import { thunkGetProducts } from "../../store/products";
import { thunkGetShops } from "../../store/shops";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";

export const ReviewForm = ({
  revId,
  id,
  formType,
  idType,
  review,
  setEditing,
}) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState(review?.body || "");
  const [rating, setRating] = useState(review?.rating || "");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  let rate = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idType === "product") {
      const reviewObj = {
        body,
        rating,
        product_id: id,
      };
      if (formType === "post") {
        const postReview = await dispatch(thunkPostReview(reviewObj));
        if (postReview && postReview.errors) {
          return setErrors(postReview.errors);
        }
      } else if (formType === "put") {
        const putReview = await dispatch(thunkPutReview(revId, reviewObj));
        if (putReview && putReview.errors) {
          return setErrors(putReview.errors);
        }
      }
    } else if (idType === "shop") {
      const reviewObj = {
        body,
        rating,
        shop_id: id,
      };

      if (formType === "post") {
        const postReview = await dispatch(thunkPostReview(reviewObj));
        if (postReview && postReview.errors) {
          return setErrors(postReview.errors);
        }
      } else if (formType === "put") {
        const putReview = await dispatch(thunkPutReview(revId, reviewObj));
        if (putReview && putReview.errors) {
          return setErrors(putReview.errors);
        }
      }
    }
    dispatch(thunkGetProducts());
    dispatch(thunkGetShops());
    setEditing(false);
    closeModal();
  };

  return (
    <form className="reviewform-form" onSubmit={handleSubmit}>
      <label className="reviewform-label">
        Body:
        <input
          className="reviewform-input"
          type="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      {errors.body && <p className="error">{errors.body}</p>}
      <label className="reviewform-label">
        Rating:
        <select
          className="reviewform-select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {rate.map((rat) => (
            <option key={rat} value={rat} className="reviewform-option">
              {rat}
            </option>
          ))}
        </select>
      </label>
      {errors.rating && <p className="error">{errors.rating}</p>}
      <button className="reviewform-button">Submit</button>
    </form>
  );
};
