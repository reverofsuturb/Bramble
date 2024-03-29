import { useState } from "react";
import { CategoryForm } from "./CategoryForm";

export const PostCategory = () => {
  const [editing, setEditing] = useState(false);
  const formType = "post";
  return (
    <>
      {editing === false ? (
        <button onClick={() => setEditing(!editing)}>Create Category</button>
      ) : (
        <CategoryForm formType={formType} setEditing={setEditing} />
      )}
    </>
  );
};
