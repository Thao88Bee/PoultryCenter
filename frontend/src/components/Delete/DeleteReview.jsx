import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/review";
import "./Delete.css";

function DeleteReview({ reviewId, setRefresh }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(reviewId));
    setRefresh((prev) => !prev);
    closeModal();
  };

  return (
    <>
      <div className="deleteShowModal">
        <h2 className="deleteShowModalheader">
          Do you really want to delete this Review?
        </h2>
        <section className="deleteShowModalBtnSec">
          <button className="deleteShowModalBtn" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="cancelShowModalBtn"
            onClick={() => {
              setRefresh((prev) => !prev);
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

export default DeleteReview;
