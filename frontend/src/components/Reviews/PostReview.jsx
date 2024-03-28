import { useState } from "react";
import { ReviewForm } from "./ReviewForm";

export const PostReview = ({ id, idType }) => {
  const formType = "post";
  const [editing, setEditing] = useState(false);

  return (
    <>
      {editing === false ? (
        <button onClick={() => setEditing(!editing)}>Add a Review</button>
      ) : (
        <ReviewForm id={id} idType={idType} formType={formType} setEditing={setEditing}/>
      )}
    </>
  );
};
