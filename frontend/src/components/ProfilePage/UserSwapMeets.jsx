import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserSwapMeetsThunk } from "../../store/swapMeet";
import DeleteModalButton from "../Delete/DeleteModalButton";
import DeleteSwapMeet from "../Delete/DeleteSwapMeet";
import "./UserSwapMeets.css";

function UserSwapMeets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState();

  const userSwapMeets = useSelector((state) => state.swap.Swaps);
  userSwapMeets?.sort((a, b) => (a.date > b.date ? 0 : -1));

  useEffect(() => {
    dispatch(getUserSwapMeetsThunk());
  }, [dispatch, showDelete, userSwapMeets.length]);

  const goToEditSwapMeet = (e, swapMeetId) => {
    e.preventDefault();
    navigate(`/swapMeets/${swapMeetId}/update`);
  };

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
            <DeleteModalButton
              buttonText="Delete"
              modalComponent={
                <DeleteSwapMeet swapMeetId={id} setShowDelete={setShowDelete} />
              }
            />
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
