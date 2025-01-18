import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPostThunk } from "../../store/post";

function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [validationErrors, setValidationErrors] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (!name.length) {
      errors.name = "Please enter a Title for your Post";
    }
    if (!description.length) {
      errors.description = "Description is needed";
    }

    setValidationErrors(errors);
  }, [name, description]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.keys(validationErrors).length) {
      return;
    }

    const newPost = {
      name,
      description,
      image,
    };

    const getPost = await dispatch(createPostThunk(newPost));

    setName("");
    setDescription("");
    setImage("");
    setHasSubmitted(false);

    navigate(`/posts/${getPost.id}`);
  };

  return (
    <>
      <div className="create">
        <h2 className="createTitle">Add a New Post</h2>
        <form className="createForm" action="">
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              Name:
            </label>
            <input
              className="createInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="error">
            {hasSubmitted &&
              validationErrors.name &&
              `*${validationErrors.name}`}
          </div>
          <div className="createSec">
            <label htmlFor="">Description:</label>
            <textarea
              className="createBigInput"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="error">
            {hasSubmitted &&
              validationErrors.description &&
              `*${validationErrors.description}`}
          </div>
          <div className="createSec">
            <label className="createLabel" htmlFor="">
              Image:
            </label>
            <input
              className="createInput"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="createBtnSec">
            <button className="createBtn" onClick={onSubmit}>
              Add Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
