import { useDispatch, useSelector } from "react-redux";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOnePostThunk } from "../../store/post";
import Footer from "../Footer";
import Review from "../Review";

function SinglePost() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => state.post.Post);

  useEffect(() => {
    dispatch(getOnePostThunk(postId));
  }, [dispatch, postId]);

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
          <Review postId={postId} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SinglePost;
