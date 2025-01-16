import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUserReviewsThunk } from "../../store/review";
import "./UserReviews.css";

function UserReviews() {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.review.Reviews);

  useEffect(() => {
    dispatch(getUserReviewsThunk());
  }, [dispatch]);

  return (
    <>
      {userReviews.map(({ id, review, starRating, Post }) => (
        <div className="userReviews" key={id}>
          <h2>Post</h2>
          <div className="userReviewPostsInfo">
            <NavLink className="userReviewPostsLink" to={`/posts/${Post?.id}`}>
              {Post?.name}
            </NavLink>
            <p>{Post?.description}</p>
          </div>
          <h3>User Review and Star rating on post</h3>
          <div className="userReviewsInfo">
            <p>{review}</p>
            <p>
              {starRating}
              <span className="star"> ★</span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserReviews;
