import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "/favicon.ico";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.User);

  const goToShow = (e) => {
    e.preventDefault();
    navigate("/shows");
  };

  const goToSwap = (e) => {
    e.preventDefault();
    navigate("/swapMeets");
  };

  const goToPost = (e) => {
    e.preventDefault();
    navigate("/posts");
  };

  const sessionLinks = sessionUser ? (
    <ProfileButton className="userBtn" user={sessionUser} />
  ) : (
    <>
      <NavLink className="loginBtn" to="/login">
        Log In
      </NavLink>
      <NavLink className="signupBtn" to="/signup">
        Sign Up
      </NavLink>
    </>
  );

  return (
    <>
      <div className="navBar">
        <section className="userSec">{isLoaded && sessionLinks}</section>

        <section className="logoSec">
          <NavLink className="appName" to="/">
            Poultry <img src={logo} alt="" /> Center
          </NavLink>
        </section>

        <section className="navLinks">
          <button onClick={goToShow}>Show</button>
          <button onClick={goToSwap}>Swap Meet</button>
          <button onClick={goToPost}>Post</button>
        </section>
      </div>
    </>
  );
}

export default Navigation;
