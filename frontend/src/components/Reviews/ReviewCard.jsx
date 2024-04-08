import { DeleteReview } from "./DeleteReview";
import { PutReview } from "./PutReview";
import OpenModalButton from "../OpenModalButton";
import { useSelector } from "react-redux";

export const ReviewCard = ({ id, review, idType, isDeleting }) => {
  const user = useSelector((state) => state.session.user);
  return (
    <div className="reviews-container" key={review.id}>
      <div>id: {review.id}</div>
      <div>Body: {review.body}</div>
      <div>Rating: {review.rating}</div>
      <div>user_id: {review.user_id}</div>
      <div>{`product_id: ${review.product_id}`}</div>
      <div>{`shop_id: ${review.shop_id}`}</div>
      {user && user.id === review.user_id ? (
        <>
          <PutReview id={id} idType={idType} review={review} />
          <OpenModalButton
            buttonText={"DELETE"}
            modalComponent={
              <DeleteReview id={review.id} isDeleting={isDeleting} />
            }
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};
