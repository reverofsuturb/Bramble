import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { thunkGetCategories } from "../../store/categories";
import { PutCategory } from "./PutCategory";
import { PostCategory } from "./PostCategory";
import OpenModalButton from "../OpenModalButton";
import "./GetAllCategories.css";
import { DeleteCategory } from "./DeleteCategory";

export const GetAllCategories = () => {
  const dispatch = useDispatch();
  const categoriesObj = useSelector((state) => state.categories);
  const [userCategories, setUserCategories] = useState(false);
  const user = useSelector((state) => state.session.user);
  const categories = Object.values(categoriesObj);
  const myCategories = categories?.filter(
    (category) => categories?.user_id === user?.id
  );

  useEffect(() => {
    dispatch(thunkGetCategories());
  }, [dispatch]);

  return (
    <div className="categories-button-div">
      {user && (
        <>
          <button
            className="categories-button-filter"
            onClick={() => setUserCategories(!userCategories)}
          >
            {userCategories
              ? "Show All Categories"
              : "Show Only Your Categories"}
          </button>
          <PostCategory />
        </>
      )}
      <div className="categories-gallery">
        {userCategories ? (
          myCategories?.length ? (
            myCategories?.map((category) => (
              <div key={category.id} className="categories-flex">
                <Link
                  className="categories-link"
                  key={category.id}
                  to={`/categories/${category.id}`}
                >
                  <div className="categories-container">
                    <div>{category.name}</div>
                  </div>
                </Link>
                {category.user_id === user?.id ? (
                  <div className="categories-utilities">
                    <PutCategory id={category.id} category={category} />
                    <OpenModalButton
                      buttonText={"DELETE CATEGORY"}
                      modalComponent={<DeleteCategory id={category.id} />}
                    />
                  </div>
                ) : (
                  " "
                )}
              </div>
            ))
          ) : (
            <h2>You haven't made any categories yet!</h2>
          )
        ) : (
          categories?.map((category) => (
            <div key={category.id} className="categories-flex">
              <Link
                className="categories-link"
                key={category.id}
                to={`/categories/${category.id}`}
              >
                <div className="categories-container">
                  <div>{category.name}</div>
                </div>
              </Link>
              {category.user_id === user?.id ? (
                <div className="categories-utilities">
                  <PutCategory id={category.id} category={category} />
                  <OpenModalButton
                    buttonText={"DELETE CATEGORY"}
                    modalComponent={<DeleteCategory id={category.id} />}
                  />
                </div>
              ) : (
                " "
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
