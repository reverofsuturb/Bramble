import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import "./PostCategory.css";
export const PostCategory = () => {
  const [editing, setEditing] = useState(false);
  const formType = "post";
  return (
    <>
      {editing === false ? (
        <button
          className="category-post-button"
          onClick={() => setEditing(!editing)}
        >
          Create Category
        </button>
      ) : (
        <CategoryForm formType={formType} setEditing={setEditing} />
      )}
    </>
  );
};
