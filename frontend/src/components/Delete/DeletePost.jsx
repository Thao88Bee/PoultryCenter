import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../store/post";
import { useModal } from "../../context/Modal";

function DeletePost({ postId, setShowDelete }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deletePostThunk(postId));
    setShowDelete((prev) => !prev);
    closeModal();
  };

  return (
    <>
      <div className="deleteShowModal">
        <h2 className="deleteShowModalheader">
          Do you really want to delelte this Post?
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

export default DeletePost;
