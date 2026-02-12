import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSwapMeetThunk } from "../../store/swapMeet";
import "./SingleSwapMeet.css";

function SingleSwapMeet() {
  const dispatch = useDispatch();
  const { swapMeetId } = useParams();

  const swapMeet = useSelector((state) => state.swap.Swap);

  useEffect(() => {
    dispatch(getOneSwapMeetThunk(swapMeetId));
  }, [dispatch, swapMeetId]);

  return (
    <>
      <div className="singleSwapMeet">
        <h1>{swapMeet.name}</h1>
        <p>
          {swapMeet.Owner?.lastName}, {swapMeet.Owner?.firstName}
        </p>
        <p>For more information contact Owner at {swapMeet.Owner?.email}</p>
        <p>{swapMeet.address}</p>
        <p>
          {swapMeet.city}, {swapMeet.state}
        </p>
        <p>
          {new Date(swapMeet.date).toLocaleString("default", {
            month: "long",
          })}{" "}
          {new Date(swapMeet.date).getUTCDate()}
          {", "}
          {new Date(swapMeet.date).getFullYear()}
        </p>
        <p>{swapMeet.description}</p>
        <img className="singleSwapMeetImg" src={swapMeet.image} alt="" />
      </div>
    </>
  );
}

export default SingleSwapMeet;
