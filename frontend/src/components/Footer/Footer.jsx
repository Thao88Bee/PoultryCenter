import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <section className="footerInfoSec">
        <div className="footerInfo">
            <h2>Focus Topics</h2>
            <NavLink className="footerLink">Poultry Shows</NavLink>
            <NavLink className="footerLink">Poultry Swap Meets</NavLink>
            <NavLink className="footerLink">The People&apos;s Posts</NavLink>
        </div>
        <div className="footerInfo">
            <h2>Social</h2>
            <NavLink className="footerLink">GitHub</NavLink>
            <NavLink className="footerLink">LinkedIn</NavLink>
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
        <p>© Copyright 2025, poultrycenter.onrender.com, All Rights Reserved.</p>
        <p>
          The following rules apply to the use of this site:{" "}
          <NavLink className="footerLink" onClick={() => alert("Feature coming soon.")}>
            Terms of Use
          </NavLink>
          ,{" "}
          <NavLink className="footerLink" onClick={() => alert("Feature coming soon.")}>
            Privacy Policy
          </NavLink>{" "}
          and{" "}
          <NavLink className="footerLink" onClick={() => alert("Feature coming soon.")}>
            Cookie Policy
          </NavLink>
          .
        </p>
        </section>
      </div>
    </>
  );
}

export default Footer;
