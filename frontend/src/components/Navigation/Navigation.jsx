import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [selected, isSelected] = useState("")
  const [wiggle, setWiggle] = useState("nav-logo")
  const handleWiggle = () => {
    setWiggle("nav-logo wiggle"); setTimeout(() => setWiggle("nav-logo"), 1100)
  }

  return (
    <div className="nav-container">
      <div onClick={handleWiggle}>
        <NavLink
          className={"nav-link"}
          onClick={() => isSelected("bramble")}
          to="/"
        >
          <img
            className={wiggle}
            src="/BrambleLogoCrop.png"
            alt="A detailed and vibrant logo for a shop named 'Bramble'. The design aesthetic should exude an appealing amalgamation of mystical elements and futuristic nuances. The shop is envisioned as a creative platform for conceiving and implementing simulation of unique boutiques, with each showcasing its own distinct array of generated art. The logo should essentially encapsulate and visually translate this concept."
          />
        </NavLink>
      </div>
      {isLoaded && (
        <div className="nav-links-container">
          <div onClick={handleWiggle}>
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
          <div onClick={handleWiggle}>
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
            <div onClick={handleWiggle}>
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
          <div onClick={handleWiggle}>
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
            <div onClick={handleWiggle}>
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
          <div className="nav-probutton-container">
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
