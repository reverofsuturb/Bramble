import { useState } from "react";
import { ReviewForm } from "./ReviewForm";

export const PutReview = ({ id, idType, review }) => {
  const formType = "put";
  const [editing, setEditing] = useState(false);

  return (
    <>
      {editing === false ? (
        <button onClick={() => setEditing(!editing)}>Edit</button>
      ) : (
        <ReviewForm
          revId={review.id}
          id={id}
          idType={idType}
          formType={formType}
          review={review}
          setEditing={setEditing}
        />
      )}
    </>
  );
};
