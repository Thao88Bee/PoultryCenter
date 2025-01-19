import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPostReviewThunk } from "../../store/review";
import AddModalButton from "../Create/AddModalButton";
import UpdateReview from "../Update/updateReview";
import { getOnePostThunk } from "../../store/post";
import DeleteModalButton from "../Delete/DeleteModalButton";
import DeleteReview from "../Delete/DeleteReview";
import "./Review.css";

function Review({ postId }) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState();

  const user = useSelector((state) => state.session.User);
  const postReviews = useSelector((state) => state.review.Reviews);
  postReviews?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0));

  useEffect(() => {
    dispatch(getPostReviewThunk(postId));
    dispatch(getOnePostThunk(postId));
  }, [dispatch, postId, refresh]);

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
          {user?.id === Owner?.id ? (
            <div className="reviewBtnSec">
              <DeleteModalButton
                buttonText="Delete"
                modalComponent={
                  <DeleteReview reviewId={id} setRefresh={setRefresh} />
                }
              />
              <AddModalButton
                buttonText="Edit"
                modalComponent={
                  <UpdateReview reviewId={id} setRefresh={setRefresh} />
                }
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
}

export default Review;
