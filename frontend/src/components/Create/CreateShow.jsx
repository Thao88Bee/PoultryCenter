import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createShowThunk } from "../../store/show";
import Footer from "../Footer";
import "./CreateShow.css";

function CreateShow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");
  const [validationErrors, setValidationErrors] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (!name.length) {
      errors.name = "Please enter your Show Name";
    }
    if (!date) {
      errors.date = "Please enter a Date";
    }
    if (!description.length) {
      errors.description = "Description is needed";
    }
    if (!address.length) {
      errors.address = "Please enter your Address";
    }
    if (!city.length) {
      errors.city = "Please enter your City";
    }
    if (!state.length) {
      errors.state = "Please enter your State";
    }

    setValidationErrors(errors);
  }, [name, date, description, address, city, state]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.keys(validationErrors).length) {
      return;
    }

    const newShow = {
      name,
      date,
      description,
      address,
      city,
      state,
      image,
    };

    const getShow = await dispatch(createShowThunk(newShow));

    setName("");
    setDate("");
    setDescription("");
    setAddress("");
    setCity("");
    setState("");
    setImage("");
    setHasSubmitted(false);

    navigate(`/shows/${getShow.id}`);
  };

  return (
    <>
      <div className="create">
        <h2 className="createTitle">Add a New Show</h2>
        <form className="createForm" action="">
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              Name:
            </label>
            <input
              className="createInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="error">
            {hasSubmitted &&
              validationErrors.name &&
              `* ${validationErrors.name}`}
          </div>
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              Date:
            </label>
            <input
              className="createInput"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="error">
            {hasSubmitted &&
              validationErrors.date &&
              `* ${validationErrors.date}`}
          </div>
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              Description:
            </label>
            <textarea
              className="createBigInput"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="error">
            {hasSubmitted &&
              validationErrors.description &&
              `* ${validationErrors.description}`}
          </div>
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              Address:
            </label>
            <input
              className="createInput"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="error">
            {hasSubmitted &&
              validationErrors.address &&
              `* ${validationErrors.address}`}
          </div>
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              City:
            </label>
            <input
              className="createInput"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="error">
            {hasSubmitted &&
              validationErrors.city &&
              `* ${validationErrors.city}`}
          </div>
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              State:
            </label>
            <input
              className="createInput"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="error">
            {hasSubmitted &&
              validationErrors.state &&
              `* ${validationErrors.state}`}
          </div>
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              Image:
            </label>
            <input
              className="createInput"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="createBtnSec">
            <button className="createBtn" onClick={onSubmit}>
              Add Show
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateShow;
