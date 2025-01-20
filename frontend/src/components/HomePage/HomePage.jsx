import AdvertisingSec from "./AdvertisingSec";
import "./HomePage.css";
import HomeSlider from "./HomeSlider";

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
          <div className="homePageMember">
            <p>Become a PoultryCenter Member</p>
            <p>Post up Shows, Swap Meets</p>
            <p>Share Idea&#39;s and Concern&#39;s</p>
            <p>or just post Fun Facts</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
