import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {/* <button onClick={toggleMenu}> */}
      <img
        className="profile-button"
        src="/profbutton.ico"
        onClick={toggleMenu}
      />
      {/* </button> */}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>

            <button className="profile-logout" onClick={logout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
              css={"profile-login-signup"}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
              css={"profile-login-signup"}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
