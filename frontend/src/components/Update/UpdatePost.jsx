import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOnePostThunk, updatePostThunk } from "../../store/post";
import "./Update.css";

function UpdatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const post = useSelector((state) => state.post?.Post);

  useEffect(() => {
    dispatch(getOnePostThunk(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setName(post?.name ? post?.name : "");
      setDescription(post?.description ? post?.description : "");
      setImage(post?.image ? post?.image : "");
    }
  }, [post]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      name,
      description,
      image,
    };

    await dispatch(updatePostThunk(updatedPost, postId));

    setName("");
    setDescription("");
    setImage("");

    navigate(`/posts/${postId}`);
  };

  return (
    <>
      <div className="update">
        <h2 className="updateTitle">Edit your Post</h2>
        <form className="updateForm" action="">
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              Name:
            </label>
            <input
              className="updateInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              Description:
            </label>
            <textarea
              className="updateBigInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="updateSec">
            <label className="updateLabel" htmlFor="">
              Image:
            </label>
            <input
              className="updateInput"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <div className="updateBtnSec">
              <button className="updateBtn" onClick={onSubmit}>
                Update Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdatePost;
