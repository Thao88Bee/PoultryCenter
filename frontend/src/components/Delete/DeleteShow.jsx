import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteShow.css";
import { deleteShowThunk } from "../../store/show";

function DeleteShow({ showId, setShowDelete }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteShowThunk(showId));
    setShowDelete((prev) => !prev);
    closeModal();
  };

  return (
    <>
      <div className="deleteShowModal">
        <h2 className="deleteShowModalheader">
          Do you really want to delelte this Show?
        </h2>
        <section className="deleteShowModalBtnSec">
          <button className="deleteShowModalBtn" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="cancelShowModalBtn"
            onClick={() => {
              setShowDelete((prev) => !prev);
              closeModal();
            }}
          >
            Cancel
          </button>
        </section>
      </div>
    </>
  );
}

export default DeleteShow;
