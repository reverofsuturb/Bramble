import { useState } from "react";
import { thunkPostReview, thunkPutReview } from "../../store/reviews";
import { thunkGetProducts } from "../../store/products";
import { thunkGetShops } from "../../store/shops";
import { useDispatch } from "react-redux";

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
    setEditing(false);
    dispatch(thunkGetProducts());
    dispatch(thunkGetShops());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Body:
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label>
        Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};
