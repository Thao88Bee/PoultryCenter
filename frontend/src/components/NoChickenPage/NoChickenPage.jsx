import { useDispatch } from "react-redux";
import logo from "/noChickenLogo.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import "./NoChickenPage.css";

function NoChickenPage() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setRefresh(true);
    });
  }, [dispatch, refresh]);

  return (
    <>
      <div className="noChicken">
        <h1 className="noChickenHeader">404</h1>
        <p>Page Not Found</p>
        <h2>NO Chicken Here!!</h2>
        <p>Click on this Little Chicken.</p>
        <NavLink to={"/"}>
          <img className="noChickenLogo" src={logo} alt="" />
        </NavLink>
        <p>He&#39;ll take you back,</p>
        <p>to where all his chicken friends run FREE!!</p>
      </div>
    </>
  );
}

export default NoChickenPage;
