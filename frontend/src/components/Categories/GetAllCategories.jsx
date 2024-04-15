import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { thunkGetCategories } from "../../store/categories";
import { PutCategory } from "./PutCategory";
import { PostCategory } from "./PostCategory";
import { CategoryImageForm } from "../CategoryImages/CategoryImageForm";
import OpenModalButton from "../OpenModalButton";
import "./GetAllCategories.css";
import { DeleteCategory } from "./DeleteCategory";

export const GetAllCategories = () => {
  const dispatch = useDispatch();
  const categoriesObj = useSelector((state) => state.categories);
  const [userCategories, setUserCategories] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [generating, isGenerating] = useState(true);
  const user = useSelector((state) => state.session.user);
  const categories = Object.values(categoriesObj);
  const myCategories = categories?.filter(
    (category) => category?.user_id === user?.id
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
          <OpenModalButton
            buttonText={"Create Category"}
            css={"categories-button"}
            modalComponent={<PostCategory />}
          />
          <button
            className="categories-button"
            onClick={() => setShowEdit(!showEdit)}
          >
            {showEdit ? "Hide Edit/Delete" : "Show Edit/Delete"}
          </button>
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
                    <img
                      src={
                        category?.CategoryImages?.length
                          ? category?.CategoryImages[0]?.image
                          : "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
                      }
                      className="categories-allimage"
                    />
                    <div>{category.name}</div>
                  </div>
                </Link>
                {category.user_id === user?.id && showEdit ? (
                  <div className="categories-utilities">
                    {!generating ? (
                      <>
                        <OpenModalButton
                          buttonText={"Edit"}
                          css={"categories-button"}
                          modalComponent={
                            <PutCategory id={category.id} category={category} />
                          }
                        />
                        <OpenModalButton
                          buttonText={"Delete"}
                          css={"categories-button"}
                          modalComponent={<DeleteCategory id={category.id} />}
                        />
                        {!category?.CategoryImages?.length && (
                          <CategoryImageForm
                            id={category.id}
                            name={category.name}
                            isGenerating={isGenerating}
                          />
                        )}
                      </>
                    ) : (
                      <div className="categories-text">
                        Image currently generating, please wait 7-10 seconds.
                      </div>
                    )}
                  </div>
                ) : (
                  " "
                )}
              </div>
            ))
          ) : (
            <h2>You haven&apos;t made any categories yet!</h2>
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
                  <img
                    src={
                      category?.CategoryImages?.length
                        ? category?.CategoryImages[0]?.image
                        : "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
                    }
                    className="categories-allimage"
                  />
                  <div>{category.name}</div>
                </div>
              </Link>
              {category.user_id === user?.id && showEdit ? (
                <div className="categories-utilities">
                  {!generating ? (
                    <>
                      {" "}
                      <OpenModalButton
                        buttonText={"Edit"}
                        css={"categories-button"}
                        modalComponent={
                          <PutCategory id={category.id} category={category} />
                        }
                      />
                      <OpenModalButton
                        buttonText={"Delete"}
                        css={"categories-button"}
                        modalComponent={<DeleteCategory id={category.id} />}
                      />
                      {!category?.CategoryImages?.length && (
                        <CategoryImageForm
                          id={category.id}
                          name={category.name}
                          isGenerating={isGenerating}
                        />
                      )}{" "}
                    </>
                  ) : (
                    <div className="categories-text">
                      Image currently generating, please wait 7-10 seconds.
                    </div>
                  )}
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
