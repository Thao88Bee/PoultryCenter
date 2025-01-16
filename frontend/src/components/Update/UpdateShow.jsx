import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneShowThunk, updateShowThunk } from "../../store/show";
import Footer from "../Footer";
import "./UpdateShow.css";

function UpdateShow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showId } = useParams();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");

  const show = useSelector((state) => state.show?.Show);

  useEffect(() => {
    dispatch(getOneShowThunk(showId));
  }, [dispatch, showId]);

  useEffect(() => {
    if (show) {
      setName(show?.name ? show?.name : "");
      setDate(show?.date ? show?.date : "");
      setDescription(show?.description ? show?.description : "");
      setAddress(show?.address ? show?.address : "");
      setCity(show?.city ? show?.city : "");
      setState(show?.state ? show?.state : "");
      setImage(show?.image ? show?.image : "");
    }
  }, [show]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedSpot = {
      name,
      date,
      description,
      address,
      city,
      state,
      image,
    };

    await dispatch(updateShowThunk(updatedSpot, showId));

    setName("");
    setDate("");
    setDescription("");
    setAddress("");
    setCity("");
    setState("");
    setImage("");

    navigate(`/shows/${showId}`);
  };

  return (
    <>
      <div className="update">
        <h2 className="updateTitle">Edit your Show</h2>
        <form className="updateForm" action="">
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              Name:
            </label>
            <input
              className="updateInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              Date:
            </label>
            <input
              className="updateInput"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              Description:
            </label>
            <textarea
              className="updateBigInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              Address:
            </label>
            <input
              className="updateInput"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              City:
            </label>
            <input
              className="updateInput"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              State:
            </label>
            <input
              className="updateInput"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              Image:
            </label>
            <input
              className="updateInput"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="updateBtnSec">
            <button className="updateBtn" onClick={onSubmit}>
              Update Show
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateShow;
