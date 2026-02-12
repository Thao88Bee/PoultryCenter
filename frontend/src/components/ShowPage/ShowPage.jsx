import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllShowsThunk } from "../../store/show";
import "./ShowPage.css";

function ShowPage() {
  const dispatch = useDispatch();

  const shows = useSelector((state) => state.show.Shows);
  shows?.sort((a, b) => (a.date > b.date ? 0 : -1));

  useEffect(() => {
    dispatch(getAllShowsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="shows">
        <section className="showHeaderSec">
          <h1>Shows Page</h1>
        </section>
        <section className="showInfoSec">
          {shows?.map(({ id, name, date }) => (
            <NavLink className="showNameDate" to={`/shows/${id}`} key={id}>
              <div className="showInfo">
                {name}
                <p>
                  <span>
                    {new Date(date).toLocaleString("default", {
                      month: "long",
                    })}
                  </span>{" "}
                  <span>{new Date(date).getUTCDate()}</span>
                  {", "}
                  <span>{new Date(date).getFullYear()}</span>
                </p>
              </div>
            </NavLink>
          ))}
        </section>
      </div>
    </>
  );
}

export default ShowPage;
