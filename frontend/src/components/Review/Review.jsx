import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostReviewThunk } from "../../store/review";
import "./Review.css";

function Review({ postId }) {
  const dispatch = useDispatch();

  const postReviews = useSelector((state) => state.review.Reviews);
  postReviews?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0));

  useEffect(() => {
    dispatch(getPostReviewThunk(postId));
  }, [dispatch, postId]);

  return (
    <>
      {postReviews.map(({ id, starRating, review, Owner }) => (
        <div className="review" key={id}>
          <div className="reviewTopSec">
            <p>
              {Owner?.lastName}, {Owner?.firstName}
            </p>
            <p>
              {starRating} <span className="star">★</span>
            </p>
          </div>
          <p>{review}</p>
          <div className="reviewBtnSec">
            <button className="reviewDeleteBtn">Delete</button>
            <button className="reviewEditBtn">Edit</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Review;
