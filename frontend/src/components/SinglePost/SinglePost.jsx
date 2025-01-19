import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOnePostThunk } from "../../store/post";
import AddModalButton from "../Create/AddModalButton";
import CreateReview from "../Create/CreateReview";
import Review from "../Review";
import Footer from "../Footer";
import "./SinglePost.css";

function SinglePost() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state) => state.session.User);
  const post = useSelector((state) => state.post.Post);

  useEffect(() => {
    dispatch(getOnePostThunk(postId));
  }, [dispatch, postId, refresh]);

  const imageClass = !post.image ? "none" : "singlePostImg";

  return (
    <>
      <div className="singlePost">
        <h1>{post.name}</h1>
        <img className={imageClass} src={post.image} alt="" />
        <p>
          Post owner {post.Owner?.lastName}, {post.Owner?.firstName}
        </p>
        <p>
          {post.avgRating ? post.avgRating : "No review"}
          {post.avgRating ? <span className="star"> ★</span> : ""}
          {post.avgRating ? " Rating" : ""}
        </p>
        <p className="postDescription">{post.description}</p>
        <div className="reviewSec">
          <div className="reviewCountAddBtn">
            <span className="reviewCount">
              {post.numReviews ? post.numReviews : "No Review"}{" "}
              {!post.numReviews
                ? ""
                : post.numReviews === 1
                ? "Review"
                : "Reviews"}
            </span>
            {user ? (
              <AddModalButton
                buttonText="Add a Review"
                modalComponent={<CreateReview setRefresh={setRefresh} />}
              />
            ) : (
              ""
            )}
          </div>
          <Review postId={postId} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SinglePost;
