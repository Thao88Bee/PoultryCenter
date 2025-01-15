import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneShowThunk } from "../../store/show";
import Footer from "../Footer";
import "./SingleShow.css";

function SingleShow() {
  const dispatch = useDispatch();
  const { showId } = useParams();
  const show = useSelector((state) => state.show.Show);

  useEffect(() => {
    dispatch(getOneShowThunk(showId));
  }, [dispatch, showId]);

  return (
    <>
      <div className="singleShow">
        <h1>{show.name}</h1>
        <p>
          {show.Owner?.lastName}, {show.Owner?.firstName}
        </p>
        <p>For more information contact Owner at {show.Owner?.email}</p>
        <p>{show.address}</p>
        <p>
          {show.city}, {show.state}
        </p>
        <p>
          {new Date(show.date).toLocaleString("default", {
            month: "long",
          })}{" "}
          {new Date(show.date).getDate()}{", "}
          {new Date(show.date).getFullYear()}
        </p>
        <p>{show.description}</p>
        <img src={show.image} alt="" />
      </div>
      <Footer />
    </>
  );
}

export default SingleShow;
