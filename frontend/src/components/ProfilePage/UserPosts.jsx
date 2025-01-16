import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPostsThunk } from "../../store/post";
import { NavLink } from "react-router-dom";
import "./UserPosts.css";

function UserPosts() {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.post.Posts);

  useEffect(() => {
    dispatch(getUserPostsThunk());
  }, [dispatch]);

  return (
    <>
      {userPosts.map(({ id, name, description, avgRating, image }) => (
        <div className="userPosts" key={id}>
          <img className="userPostsImg" src={image} alt="" />
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
              <button className="userPostsDeleteBtn">Delete</button>
              <button className="userPostsEditBtn">Edit</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserPosts;
