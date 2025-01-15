import { useDispatch, useSelector } from "react-redux";
import "./Review.css";
import { useEffect } from "react";
import { getPostReviewThunk } from "../../store/review";

function Review({ postId }) {
    const dispatch = useDispatch()
    const postReviews = useSelector((state) => state.review.Reviews)

    useEffect(() => {
        dispatch(getPostReviewThunk(postId))
    }, [dispatch, postId])

  return (
    <>
    {postReviews.map(({ id, starRating, review, Owner }) => (
      <div className="review" key={id}>
        <div className="reviewTopSec">
        <p>{Owner.lastName}, {Owner.firstName}</p>
        <p>{starRating} <span className="star">★</span></p>
        </div>
        <p>{review}</p>
      </div>
    ))}
    </>
  );
}

export default Review;
