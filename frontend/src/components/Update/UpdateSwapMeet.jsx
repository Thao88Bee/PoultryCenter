import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneSwapMeetThunk, updateSwapMeetThunk } from "../../store/swapMeet";
import Footer from "../Footer";
import "./Update.css";

function UpdateSwapMeet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { swapMeetId } = useParams();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");

  const swapMeet = useSelector((state) => state.swap.Swap);

  useEffect(() => {
    dispatch(getOneSwapMeetThunk(swapMeetId));
  }, [dispatch, swapMeetId]);

  useEffect(() => {
    if (swapMeet) {
      setName(swapMeet?.name ? swapMeet?.name : "");
      setDate(swapMeet?.date ? swapMeet?.date : "");
      setDescription(swapMeet?.description ? swapMeet?.description : "");
      setAddress(swapMeet?.address ? swapMeet?.address : "");
      setCity(swapMeet?.city ? swapMeet?.city : "");
      setState(swapMeet?.state ? swapMeet?.state : "");
      setImage(swapMeet?.image ? swapMeet?.image : "");
    }
  }, [swapMeet]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedSwapMeet = {
      name,
      date,
      description,
      address,
      city,
      state,
      image,
    };

    await dispatch(updateSwapMeetThunk(updatedSwapMeet, swapMeetId));

    setName("");
    setDate("");
    setDescription("");
    setAddress("");
    setCity("");
    setState("");
    setImage("");

    navigate(`/swapMeets/${swapMeetId}`);
  };

  return (
    <>
      <div className="update">
        <h2 className="updateTitle">Edit your Swap Meet</h2>
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
              Update Swap Meet
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateSwapMeet;
