import { DeleteReview } from "./DeleteReview";
import { PutReview } from "./PutReview";
import OpenModalButton from "../OpenModalButton";
import { useSelector } from "react-redux";
import { FaRegStar } from "react-icons/fa";
import "./ReviewCard.css";

export const ReviewCard = ({ id, review, idType, isDeleting }) => {
  const user = useSelector((state) => state.session.user);
  return (
    <div className="reviews-container" key={review.id}>
      <div>{review.body}</div>
      <div>
        {review.rating} <FaRegStar />
      </div>
      <div>
        {review?.User?.username && ` Review by ${review?.User?.username}`}
      </div>
      {user && user.id === review.user_id ? (
        <>
          <OpenModalButton
            buttonText={"EDIT REVIEW"}
            css={"reviews-button"}
            modalComponent={
              <PutReview id={id} idType={idType} review={review} />
            }
          />
          <OpenModalButton
            buttonText={"DELETE REVIEW"}
            css={"reviews-button"}
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
