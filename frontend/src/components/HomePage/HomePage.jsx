import AdvertisingSec from "./AdvertisingSec";
import "./HomePage.css";
import HomeSlider from "./HomeSlider";
import show1 from "../../images/s1.jpg";

function HomePage() {
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
            <h2>Welcom To Poultry Center</h2>
            <p>We are all about Poultry and Poultry Lovers</p>
            <p>Share Idea&#39;s and Concern&#39;s</p>
            <p>or just Fun Facts</p>
          </div>
          <img className="homePageShowImage" src={show1} alt="" />
          <div>
            <div className="homePageMember">
              <p>Become a PoultryCenter Member</p>
              <p>Post up Shows, Swap Meets</p>
              <p>So everyone get the lastest updates</p>
              <p>About yor Show, Swap Meets</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
