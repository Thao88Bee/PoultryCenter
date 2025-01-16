import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPostsThunk } from "../../store/post";
import Footer from "../Footer";
import "./PostPage.css";

function PostPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.Posts);

  const sortedPosts = posts?.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 0
  );

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
          {sortedPosts.map(({ id, name, avgRating }) => (
            <div className="postInfo" key={id}>
              <NavLink className="postName" to={`/posts/${id}`}>
                {name}
              </NavLink>
              <p>
                {avgRating ? avgRating : "No review"}
                {avgRating ? <span className="star"> ★</span> : ""}
              </p>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PostPage;
