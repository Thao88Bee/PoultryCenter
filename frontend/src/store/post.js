const GET_ALL_POSTS = "post/getAllPosts";
const GET_ONE_POST = "post/getOnePost";

export const getAllPostsAction = (posts) => {
  return {
    type: GET_ALL_POSTS,
    payload: posts,
  };
};

export const getOnePostAction = (post) => {
  return {
    type: GET_ONE_POST,
    payload: post,
  };
};

export const getAllPostsThunk = () => async (dispatch) => {
  const res = await fetch("/api/posts");

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllPostsAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const getOnePostThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getOnePostAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

const initialState = {
  Posts: [],
  Post: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return { ...state, Posts: action.payload.Posts };
    case GET_ONE_POST:
      return { ...state, Post: action.payload };
    default:
      return state;
  }
};

export default postReducer;
