import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPostsThunk } from "../../store/post";
import "./PostPage.css";

function PostPage() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.Posts);
  posts?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0));

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="posts">
        <section className="postHeaderSec">
          <h1>Posts Page</h1>
        </section>
        <section className="postInfoSec">
          {posts.map(({ id, name, avgRating }) => (
            <NavLink className="postNameStar" to={`/posts/${id}`} key={id}>
              <div className="postInfo">
                <p>{name}</p>
                <p>
                  {avgRating ? avgRating : "No review"}
                  {avgRating ? <span className="star"> ★</span> : ""}
                </p>
              </div>
            </NavLink>
          ))}
        </section>
      </div>
    </>
  );
}

export default PostPage;
