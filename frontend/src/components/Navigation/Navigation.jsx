import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [selected, isSelected] = useState("");
  return (
    <div className="nav-container">
      <div>
        <NavLink
          className={
            selected === "bramble" ? "nav-link nav-link-b" : "nav-link"
          }
          onClick={() => isSelected("bramble")}
          to="/"
        >
          Bramble
        </NavLink>
      </div>
      {isLoaded && (
        <>
          <div>
            <NavLink
              className={
                selected === "cat" ? "nav-link nav-link-b" : "nav-link"
              }
              onClick={() => isSelected("cat")}
              to="/categories"
            >
              Categories
            </NavLink>
          </div>
          <div>
            <NavLink
              className={
                selected === "prod" ? "nav-link nav-link-b" : "nav-link"
              }
              onClick={() => isSelected("prod")}
              to="/products"
            >
              Products
            </NavLink>
          </div>
          {sessionUser ? (
            <div>
              <NavLink
                className={
                  selected === "newprod" ? "nav-link nav-link-b" : "nav-link"
                }
                onClick={() => isSelected("newprod")}
                to="/products/new"
              >
                New Product
              </NavLink>
            </div>
          ) : (
            ""
          )}
          <div>
            <NavLink
              className={
                selected === "shop" ? "nav-link nav-link-b" : "nav-link"
              }
              onClick={() => isSelected("shop")}
              to="/shops"
            >
              Shops
            </NavLink>
          </div>
          {sessionUser ? (
            <div>
              <NavLink
                className={
                  selected === "newshop" ? "nav-link nav-link-b" : "nav-link"
                }
                onClick={() => isSelected("newshop")}
                to="/shops/new"
              >
                New Shop
              </NavLink>
            </div>
          ) : (
            ""
          )}
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
