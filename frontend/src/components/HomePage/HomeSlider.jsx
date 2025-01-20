import c1 from "../../images/c1.jpg";
import c2 from "../../images/c2.jpg";
import c3 from "../../images/c3.jpg";
import c4 from "../../images/c4.jpg";
import c5 from "../../images/c5.jpg";
import c6 from "../../images/c6.jpg";
import c7 from "../../images/c7.jpg";
import c8 from "../../images/c8.jpg";
import c9 from "../../images/c9.jpg";
import c10 from "../../images/c10.jpg";
import c11 from "../../images/c11.jpg";
import c12 from "../../images/c12.jpg";
import "./HomeSlider.css";

function HomeSlider() {
  return (
    <>
      <div
        className="homeSlider"
        style={{ "--width": "200px", "--height": "250px", "--quantity": 10 }}
      >
        <div className="homeSliderList">
          <div className="homeSliderImage" style={{ "--position": 1 }}>
            <img src={c1} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 2 }}>
            <img src={c2} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 3 }}>
            <img src={c3} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 4 }}>
            <img src={c4} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 5 }}>
            <img src={c5} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 6 }}>
            <img src={c6} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 7 }}>
            <img src={c7} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 8 }}>
            <img src={c8} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 9 }}>
            <img src={c9} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 10 }}>
            <img src={c10} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 11 }}>
            <img src={c11} alt="" />
          </div>
          <div className="homeSliderImage" style={{ "--position": 12 }}>
            <img src={c12} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSlider;
