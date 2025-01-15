import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllShowsThunk } from "../../store/show";
import "./ShowPage.css";

function ShowPage() {
  const dispatch = useDispatch();
  const shows = useSelector((state) => state.show.Shows);

  console.log(shows);

  useEffect(() => {
    dispatch(getAllShowsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="shows">
        <section className="showHeaderSec">
          <h1>Show Page</h1>
        </section>

        <section className="showInfoSec">
          {shows.map(({ id, name, date }) => (
            <div className="showInfo" key={id}>
              <NavLink className="showName">{name}</NavLink>
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
          ))}
        </section>
      </div>
    </>
  );
}

export default ShowPage;
