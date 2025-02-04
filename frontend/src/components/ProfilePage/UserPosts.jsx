import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPostsThunk } from "../../store/post";
import { NavLink, useNavigate } from "react-router-dom";
import DeleteModalButton from "../Delete/DeleteModalButton";
import DeletePost from "../Delete/DeletePost";
import "./UserPosts.css";

function UserPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const userPosts = useSelector((state) => state.post.Posts);
  userPosts?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0));

  useEffect(() => {
    dispatch(getUserPostsThunk());
  }, [dispatch, showDelete, userPosts.length]);

  const goToEditPost = (e, postId) => {
    e.preventDefault();
    navigate(`/posts/${postId}/update`);
  };

  return (
    <>
      {userPosts.map(({ id, name, description, avgRating, image }) => (
        <div className="userPosts" key={id}>
          <img className={image ? "userPostsImg" : ""} src={image} alt="" />
          <div className="userPostsInfo">
            <NavLink className="userPostsLink" to={`/posts/${id}`}>
              {name}
            </NavLink>
            <p>{description}</p>
            <p>
              {avgRating ? avgRating : "No review"}
              {avgRating ? <span className="star"> ★</span> : ""}
            </p>
            <div className="userPostsBtn">
              <DeleteModalButton
                buttonText="Delete"
                modalComponent={
                  <DeletePost postId={id} setShowDelete={setShowDelete} />
                }
              />
              <button
                className="userPostsEditBtn"
                onClick={(e) => goToEditPost(e, id)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserPosts;
