import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import "./PostCategory.css";
export const PostCategory = () => {
  const [editing, setEditing] = useState(false);
  const formType = "post";
  return (
    <>
      <CategoryForm formType={formType} setEditing={setEditing} editing={editing}/>
    </>
  );
};
