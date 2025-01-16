import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import TermsOfUse from "./TermsOfUse";
import PrivacyPolicy from "./PrivacyPolicy";
import CookiePolicy from "./CookiePolicy";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <section className="footerInfoSec">
          <div className="footerInfo">
            <h2>Focus Topics</h2>
            <NavLink className="footerLink" to={"/shows"}>
              Poultry Shows
            </NavLink>
            <NavLink className="footerLink" to={"/swapMeets"}>
              Poultry Swap Meets
            </NavLink>
            <NavLink className="footerLink" to={"/posts"}>
              The People&apos;s Posts
            </NavLink>
          </div>
          <div className="footerInfo">
            <h2>Social</h2>
            <NavLink
              className="footerLink"
              to={"https://github.com/Thao88Bee"}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </NavLink>
            <NavLink
              className="footerLink"
              to={"https://www.linkedin.com/in/bee-thao-336483330/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </NavLink>
            <p>FaceBook</p>
            <p>Instagram</p>
          </div>
          <div className="footerInfo">
            <h2>Services</h2>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Advertising</p>
          </div>
        </section>
        <section className="footerRightsSec">
          <h1>Poultry Center</h1>
          <p>
            © Copyright 2025, poultrycenter.onrender.com, All Rights Reserved.
          </p>
          <p>
            The following rules apply to the use of this site:{" "}
            <OpenModalButton
              buttonText="Terms of Use"
              modalComponent={<TermsOfUse />}
            />
            ,{" "}
            <OpenModalButton
              buttonText="Privacy Policy"
              modalComponent={<PrivacyPolicy />}
            />{" "}
            and{" "}
            <OpenModalButton
              buttonText="Cookie Policy"
              modalComponent={<CookiePolicy />}
            />
            .
          </p>
        </section>
      </div>
    </>
  );
}

export default Footer;
