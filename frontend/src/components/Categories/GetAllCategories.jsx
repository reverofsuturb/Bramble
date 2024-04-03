import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  thunkGetCategories,
  thunkDeleteCategory,
} from "../../store/categories";
import { PutCategory } from "./PutCategory";
import { PostCategory } from "./PostCategory";
import "./GetAllCategories.css";

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
      <div className="categories-gallery">
        {categories?.map((category) => (
          <Link className="categories-link" key={category.id} to={`/categories/${category.id}`}>
            <div className="categories-container">
              <div>{category.name}</div>
              <PutCategory id={category.id} category={category} />
              <button
                onClick={(e) => dispatch(thunkDeleteCategory(category.id))}
              >
                DELETE
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
