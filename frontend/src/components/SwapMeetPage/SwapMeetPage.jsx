import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSwapMeetsThunk } from "../../store/swapMeet";
import Footer from "../Footer";
import "./SwapMeetPage.css";

function SwapMeetPage() {
  const dispatch = useDispatch();

  const swapMeets = useSelector((state) => state.swap.Swaps);
  swapMeets?.sort((a, b) => (a.date > b.date ? 0 : -1));

  useEffect(() => {
    dispatch(getAllSwapMeetsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="swapMeets">
        <section className="swapMeetHeaderSec">
          <h1>Swap Meets Page</h1>
        </section>
        <section className="swapMeetInfoSec">
          {swapMeets.map(({ id, name, date }) => (
            <NavLink className="swapMeetNameDate" to={`/swapMeets/${id}`}>
              <div className="swapMeetInfo" key={id}>
                {name}
                <p>
                  <span>
                    {new Date(date).toLocaleString("default", {
                      month: "long",
                    })}
                  </span>{" "}
                  <span>{new Date(date).getDate()}</span>
                  {", "}
                  <span>{new Date(date).getFullYear()}</span>
                </p>
              </div>
            </NavLink>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default SwapMeetPage;
