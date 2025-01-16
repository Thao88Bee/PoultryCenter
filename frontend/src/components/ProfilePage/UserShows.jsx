import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserShowsThunk } from "../../store/show";
import { NavLink, useNavigate } from "react-router-dom";
import "./UserShows.css";

function UserShows() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userShows = useSelector((state) => state.show.Shows);

  const sortedUserShows = userShows?.sort((a, b) => (a.date > b.date ? 0 : -1));

  useEffect(() => {
    dispatch(getUserShowsThunk());
  }, [dispatch]);

  const goEditShow = (e, showId) => {
    e.preventDefault();
    navigate(`/shows/${showId}/update`)
  };

  return (
    <>
      {sortedUserShows.map(({ id, name, date }) => (
        <div className="userShows" key={id}>
          <div className="userShowsInfo">
            <NavLink className="userShowsLink" to={`/shows/${id}`}>
              {name}
            </NavLink>
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
          <div className="userShowsBtn">
            <button className="userShowsDeleteBtn">Delete</button>
            <button
              className="userShowsEditBtn"
              onClick={(e) => goEditShow(e, id)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserShows;
