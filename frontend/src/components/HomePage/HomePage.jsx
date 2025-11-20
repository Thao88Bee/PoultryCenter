import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeSlider from "./HomeSlider";
import AdvertisingSec from "./AdvertisingSec";
import showOne from "../../images/s1.jpg";
import swapOne from "../../images/taylor.jpg";
import swapTwo from "../../images/taylor2.jpg";
import swapThree from "../../images/taylor3.jpg";
import swapFour from "../../images/pk.jpg";
import swapFive from "../../images/taylor6.jpg";
import swapSix from "../../images/taylor7.jpg";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.User);

  const goTo = (e, page) => {
    e.preventDefault();
    navigate(`/${page}`);
  };

  return (
    <>
      <div className="homePageWinner">
        <h2 className="winnerHeader">Champions</h2>
        <HomeSlider />
      </div>
      <div className="homePageSec">
        <AdvertisingSec />
        <div className="homePageSecTwo">
          <div className="homePageWelcome">
            <h2>Welcome To Poultry Center</h2>
            <p>We are all about Poultry and Poultry Lovers</p>
            <p>Share Idea&#39;s and Concern&#39;s</p>
            <p>or just Fun Facts</p>
          </div>
          <img className="homePageShowImage" src={showOne} alt="" />
          <div className="homePageSwapSec">
            <img className="homePageSwapImage" src={swapOne} alt="" />
            <img className="homePageSwapImage" src={swapTwo} alt="" />
            <img className="homePageSwapImage" src={swapThree} alt="" />
            <img className="homePageSwapImage" src={swapFour} alt="" />
            <img className="homePageSwapImage" src={swapFive} alt="" />
            <img className="homePageSwapImage" src={swapSix} alt="" />
          </div>
          <div>
            {!user ? (
              <div className="homePageMember">
                <p>Become a PoultryCenter Member</p>
                <p>Post up Shows, Swap Meets</p>
                <p>So everyone get the lastest updates</p>
                <p>About your Show, Swap Meets</p>
                <br />
                <button
                  className="signupBtn"
                  onClick={(e) => goTo(e, "signup")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
