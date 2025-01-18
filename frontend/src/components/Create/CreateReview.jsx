import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, getPostReviewThunk } from "../../store/review";
import "./ReviewModal.css";

function CreateReview() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");
  const [starRating, setStarRating] = useState("");
  const [selected, setselected] = useState(0);
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
      const newReview = {
        review,
        starRating,
      };

      await dispatch(createReviewThunk(newReview, postId));

      setReview("");
      setStarRating("");
    } catch (err) {
      setError("Fail");
      setTimeout(() => setError(null), 5000);
    }

    closeModal();
  };

  return (
    <div className="reviewModal">
      <h3 className="reviewModalTitle">Write Your Review Here</h3>
      <div>
        {[...Array(5)].map((_, index) => {
          return (
            <span
              className={`${
                index + 1 <= selected ? "starRating" : "starFirst"
              }`}
              key={index}
              value={starRating}
              onClick={() => (setselected(index + 1), setStarRating(index + 1))}
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
          onClick={() => (onSubmit(), setReload(true))}
        >
          Submit Your Review
        </button>
      </div>
    </div>
  );
}

export default CreateReview;
