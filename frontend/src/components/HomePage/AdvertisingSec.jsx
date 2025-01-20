import { NavLink } from "react-router-dom";
import bantamClub from "../../images/bantamclub.jpg";
import smithPoultrySupples from "../../images/SmithPoultrySupply.png";
import cackleHatchery from "../../images/cackleHCB.jpg";
import chewy from "../../images/chewy.png";
import poultryPedia from "../../images/poultrypedia.png";
import rogierPoultrySupply from "../../images/rogierpoultrysupply.png";
import valleyVet from "../../images/valleyVet.png";
import stromberg from "../../images/stromberg.jpg";
import tsc from "../../images/tsc.png";
import "./AdvertisingSec.css";

function AdvertisingSec() {
  return (
    <>
      <div className="homePageSecOne">
        <NavLink to="https://www.strombergschickens.com/" target="_blank">
          <img className="homePageAd" src={stromberg} alt="" />
        </NavLink>
        <NavLink to="https://www.tractorsupply.com/" target="_blank">
          <img className="homePageAd" src={tsc} alt="" />
        </NavLink>
        <NavLink to="https://www.bantamclub.com/" target="_blank">
          <img className="homePageAd" src={bantamClub} alt="" />
        </NavLink>
        <NavLink to="https://www.poultrysupplies.com/" target="_blank">
          <img className="homePageAd" src={smithPoultrySupples} alt="" />
        </NavLink>
        <NavLink to="https://www.cacklehatchery.com/" target="_blank">
          <img className="homePageAd" src={cackleHatchery} alt="" />
        </NavLink>
        <NavLink to="https://www.chewy.com/" target="_blank">
          <img className="homePageAd" src={chewy} alt="" />
        </NavLink>
        <NavLink
          to="https://web.archive.org/web/20231004112910/https://sites.google.com/a/poultrypedia.com/poultrypedia/"
          target="_blank"
        >
          <img className="homePageAd" src={poultryPedia} alt="" />
        </NavLink>
        <NavLink to="https://www.rogierpoultrysupplies.com/" target="_blank">
          <img className="homePageAd" src={rogierPoultrySupply} alt="" />
        </NavLink>
        <NavLink to="https://www.valleyvet.com/" target="_blank">
          <img className="homePageAd" src={valleyVet} alt="" />
        </NavLink>
      </div>
    </>
  );
}

export default AdvertisingSec;
