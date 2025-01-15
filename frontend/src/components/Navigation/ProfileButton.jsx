// import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showMenu, setShowMenu] = useState(false);
  // const ulRef = useRef();

  // const toggleMenu = (e) => {
  //   e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
  //   // if (!showMenu) setShowMenu(true);
  //   setShowMenu(!showMenu);
  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (ulRef.current && !ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const goToProfile = (e) => {
    e.preventDefault();
    navigate("/profile")
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {/* <ul className={ulClassName} ref={ulRef}>
        <li></li>
        <li>
          {user.firstName} {user.lastName}
        </li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul> */}
      <button className="logoutBtn" onClick={logout}>Log Out</button>
      <button className="userBtn" onClick={goToProfile}>
        <FaUserCircle />
        {user.username}
      </button>
    </>
  );
}

export default ProfileButton;
