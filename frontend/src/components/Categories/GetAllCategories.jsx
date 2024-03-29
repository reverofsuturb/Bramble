import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkGetCategories,
  thunkDeleteCategory,
} from "../../store/categories";
import { PutCategory } from "./PutCategory";
import { PostCategory } from "./PostCategory";
export const GetAllCategories = () => {
  const dispatch = useDispatch();
  const categoriesObj = useSelector((state) => state.categories);
  const categories = Object.values(categoriesObj);

  useEffect(() => {
    dispatch(thunkGetCategories());
  }, [dispatch]);

  return (
    <div>
      <PostCategory />
      {categories?.map((category) => (
        <div>
          <div>{category.name}</div>
          <PutCategory id={category.id} category={category} />
          <button onClick={(e) => dispatch(thunkDeleteCategory(category.id))}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
};
