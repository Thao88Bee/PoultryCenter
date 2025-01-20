import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "/favicon.ico";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.User);

  const goTo = (e, page) => {
    e.preventDefault();
    navigate(`/${page}`);
  };

  const sessionLinks = sessionUser ? (
    <ProfileButton className="userBtn" user={sessionUser} />
  ) : (
    <>
      <button className="loginBtn" onClick={(e) => goTo(e, "login")}>
        Log In
      </button>
      <button className="signupBtn" onClick={(e) => goTo(e, "signup")}>
        Sign Up
      </button>
    </>
  );

  return (
    <>
      <div className="navBar">
        <section className="userSec">{isLoaded && sessionLinks}</section>

        <section className="logoSec">
          <NavLink className="appName" to={"/"}>
            Poultry <img src={logo} alt="" /> Center
          </NavLink>
        </section>

        <section className="navBtns">
          <button onClick={(e) => goTo(e, "shows")}>Shows</button>
          <button onClick={(e) => goTo(e, "swapMeets")}>Swap Meets</button>
          <button onClick={(e) => goTo(e, "posts")}>Posts</button>
        </section>
      </div>
    </>
  );
}

export default Navigation;
