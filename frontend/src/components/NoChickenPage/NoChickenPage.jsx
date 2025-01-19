import { useSelector } from "react-redux";
import logo from "/favicon.ico";
import { NavLink } from "react-router-dom";
import "./NoChickenPage.css";

function NoChickenPage() {
  const user = useSelector((state) => state.session.User);

  return (
    <>
      <div className="noChicken">
        <h1 className="noChickenHeader">404</h1>
        <p>Page Not Found</p>
        <h2>NO Chicken Here!!</h2>
        <p>Click on this Little Chicken.</p>
        <NavLink to={user ? "/home" : "/"}>
          <img className="noChickenLogo" src={logo} alt="" />
        </NavLink>
        <p>He&#39;ll take you back,</p>
        <p>to where all his chicken friends run FREE!!</p>
      </div>
    </>
  );
}

export default NoChickenPage;
