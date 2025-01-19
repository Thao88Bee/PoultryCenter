import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { getPostReviewThunk, updateReviewThunk } from "../../store/review";
import "../Create/ReviewModal.css";

function UpdateReview({ reviewId, setRefresh }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");
  const [starRating, setStarRating] = useState("");
  const [selected, setSelected] = useState(0);
  const [reload, setReload] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const post = useSelector((state) => state.post.Post);
  const postId = post.id;

  useEffect(() => {
    if (!review.length || starRating <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    dispatch(getPostReviewThunk(postId));
  }, [dispatch, reload, postId, error, review, starRating]);

  const onSubmit = async () => {
    try {
      const updatedReview = {
        review,
        starRating,
      };

      await dispatch(updateReviewThunk(updatedReview, reviewId));

      setReview("");
      setStarRating("");
    } catch (err) {
      setError("Fail");
      setTimeout(() => setError(null, 5000));
    }

    closeModal();
  };

  return (
    <>
      <div className="reviewModal">
        <h3 className="reviewModalTitle">Update your review</h3>
        <div>
          {[...Array(5)].map((_, index) => {
            return (
              <span
                className={`${
                  index + 1 <= selected ? "starRating" : "starFirst"
                }`}
                key={index}
                value={starRating}
                onClick={() => (
                  setSelected(index + 1), setStarRating(index + 1)
                )}
              >
                {" "}
                ★{" "}
              </span>
            );
          })}
        </div>
        <div>Star Rating Count: {selected}</div>
        <div>
          <textarea
            className="reviewTextArea"
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            className="reviewModalBtn"
            disabled={disabled}
            onClick={() => (
              onSubmit(), setReload(true), setRefresh((prev) => !prev)
            )}
          >
            Update Your Review
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateReview;
