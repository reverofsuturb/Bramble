import { useState } from "react";
import { CategoryForm } from "./CategoryForm";

export const PutCategory = ({ id, category }) => {
  const formType = "put";
  const [editing, setEditing] = useState(false);

  return (
    <>
      {editing === false ? (
        <button onClick={() => setEditing(!editing)}>Edit</button>
      ) : (
        <CategoryForm
          formType={formType}
          id={id}
          category={category}
          setEditing={setEditing}
        />
      )}
    </>
  );
};
