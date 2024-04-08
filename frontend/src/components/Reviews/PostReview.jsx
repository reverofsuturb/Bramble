import { useState } from "react";
import { ReviewForm } from "./ReviewForm";

export const PostReview = ({ id, idType }) => {
  const formType = "post";
  const [editing, setEditing] = useState(false);

  return (
    <>
      <ReviewForm
        id={id}
        idType={idType}
        formType={formType}
        setEditing={setEditing}
        editing={editing}
      />
    </>
  );
};
