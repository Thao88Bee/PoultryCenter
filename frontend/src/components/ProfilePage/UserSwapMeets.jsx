import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUserSwapMeetsThunk } from "../../store/swapMeet";
import "./UserSwapMeets.css";

function UserSwapMeets() {
  const dispatch = useDispatch();
  const userSwapMeets = useSelector((state) => state.swap.Swaps);

  useEffect(() => {
    dispatch(getUserSwapMeetsThunk());
  }, [dispatch]);

  return (
    <>
      {userSwapMeets.map(({ id, name, date }) => (
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
            <button className="userSwapMeetsEditBtn">Edit</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserSwapMeets;
