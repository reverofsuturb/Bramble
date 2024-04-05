import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetProducts } from "../../store/products";
import { Link, useNavigate } from "react-router-dom";
import { thunkGetProductImages } from "../../store/productimages";
import "./GetAllProducts.css";

export const GetAllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState(false);
  const user = useSelector((state) => state.session.user);
  const productsObj = useSelector((state) => state.products);
  const products = Object.values(productsObj);
  const myProducts = products?.filter(
    (product) => product?.user_id === user?.id
  );

  const getRating = (prod) => {
    return prod.Reviews.reduce((a, c) => a + c.rating, 0) / prod.Reviews.length;
  };
  useEffect(() => {
    dispatch(thunkGetProducts());
    dispatch(thunkGetProductImages());
  }, [dispatch]);

  return (
    <div className="products-button-div">
      {user && (
        <button
          className="products-button-filter"
          onClick={() => setUserProducts(!userProducts)}
        >
          {userProducts ? "Show All Products" : "Show Only Your Products"}
        </button>
      )}
      <div className="products-gallery">
        {userProducts ? (
          myProducts?.length ? (
            myProducts.map((product) => (
              <Link
                className="products-link"
                key={product.id}
                to={`/products/${product.id}`}
              >
                <div className="products-container">
                  <img
                    className="products-allimage"
                    src={
                      product?.ProductImages?.length
                        ? product?.ProductImages[0]?.image
                        : "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
                    }
                  />
                  <div className="products-container-text">
                    <div className="products-name">{product.name}</div>
                    <div>${product?.price.toFixed(2)}</div>
                    <div className="products-review-shop">
                      <div>
                        {product?.Reviews?.length
                          ? getRating(product)
                          : "Not Rated"}
                      </div>
                      {product?.Shop?.id ? (
                        <div>
                          Visit{" "}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              navigate(`/shops/${product?.Shop?.id}`);
                            }}
                            className="products-link-shop"
                          >
                            {product?.Shop?.name}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="products-text">
                      {product?.Category?.name && `${product?.Category?.name}`}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h2> You haven&apos;t made any products yet!</h2>
          )
        ) : (
          products?.map((product) => (
            <Link
              className="products-link"
              key={product.id}
              to={`/products/${product.id}`}
            >
              <div className="products-container">
                <img
                  className="products-allimage"
                  src={
                    product?.ProductImages?.length
                      ? product?.ProductImages[0]?.image
                      : "https://bramble-bucket.s3.us-east-2.amazonaws.com/1712157318099.png"
                  }
                />
                <div className="products-container-text">
                  <div className="products-name">{product.name}</div>
                  <div>${product?.price.toFixed(2)}</div>
                  <div className="products-review-shop">
                    <div>
                      {product?.Reviews?.length
                        ? getRating(product)
                        : "Not Rated"}
                    </div>
                    {product?.Shop?.id ? (
                      <div>
                        Visit{" "}
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            navigate(`/shops/${product?.Shop?.id}`);
                          }}
                          className="products-link-shop"
                        >
                          {product?.Shop?.name}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="products-text">
                    {product?.Category?.name && `${product?.Category?.name}`}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
