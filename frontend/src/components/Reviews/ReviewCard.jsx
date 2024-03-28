import { PutReview } from "./PutReview";
export const ReviewCard = ({ id, review, idType }) => {
  return (
    <div className="reviews-container">
      <div>id: {review.id}</div>
      <div>Body: {review.body}</div>
      <div>Rating: {review.rating}</div>
      <div>user_id: {review.user_id}</div>
      <div>{`product_id: ${review.product_id}`}</div>
      <div>{`shop_id: ${review.shop_id}`}</div>
      <PutReview id={id} idType={idType} review={review} />
    </div>
  );
};
