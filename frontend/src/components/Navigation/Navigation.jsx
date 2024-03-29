import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/products/new">New Product</NavLink>
          </li>
          <li>
            <NavLink to="/shops">Shops</NavLink>
          </li>
          <li>
            <NavLink to="/shops/new">New Shop</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
