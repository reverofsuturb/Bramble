import { useState } from "react";
import { CategoryForm } from "./CategoryForm";

export const PutCategory = ({ id, category }) => {
  const formType = "put";
  const [editing, setEditing] = useState(false);

  return (
    <>
      <CategoryForm
        formType={formType}
        id={id}
        category={category}
        setEditing={setEditing}
        editing={editing}
      />
    </>
  );
};
