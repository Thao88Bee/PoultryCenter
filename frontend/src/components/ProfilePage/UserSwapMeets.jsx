import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserSwapMeetsThunk } from "../../store/swapMeet";
import "./UserSwapMeets.css";

function UserSwapMeets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSwapMeets = useSelector((state) => state.swap.Swaps);

  const sortedUserSwapMeets = userSwapMeets?.sort((a, b) =>
    a.date > b.date ? 0 : -1
  );

  useEffect(() => {
    dispatch(getUserSwapMeetsThunk());
  }, [dispatch]);

  const goToEditSwapMeet = (e, swapMeetId) => {
    e.preventDefault();
    navigate(`/swapMeets/${swapMeetId}/update`);
  };

  return (
    <>
      {sortedUserSwapMeets.map(({ id, name, date }) => (
        <div className="userSwapMeets" key={id}>
          <div className="userSwapMeetsInfo">
            <NavLink className="userSwapMeetsLink" to={`/swapMeets/${id}`}>
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
          <div className="userSwapMeetsBtn">
            <button className="userSwapMeetsDeleteBtn">Delete</button>
            <button
              className="userSwapMeetsEditBtn"
              onClick={(e) => goToEditSwapMeet(e, id)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserSwapMeets;
