import { csrfFetch } from "./csrf";

const GET_ALL_POSTS = "post/getAllPosts";
const GET_ONE_POST = "post/getOnePost";
const GET_USER_POSTS = "post/getUserPosts";
const CREATE_POST = "post/createPost";
const UPDATE_POST = "post/updatePost";
const DELETE_POST = "post/deletePost";

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

export const getUserPostsAction = (posts) => {
  return {
    type: GET_USER_POSTS,
    payload: posts,
  };
};

export const createPostAction = (post) => {
  return {
    type: CREATE_POST,
    payload: post,
  };
};

export const updatePostAction = (post) => {
  return {
    type: UPDATE_POST,
    payload: post,
  };
};

export const deletePostAction = (postId) => {
  return {
    type: DELETE_POST,
    payload: postId,
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

export const getUserPostsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/user/posts");

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserPostsAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const createPostThunk = (newPost) => async (dispatch) => {
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    headers: {
      "Context-type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createPostAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const updatePostThunk = (updatedPost, postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Context-type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updatePostAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const deletePostThunk = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deletePostAction(data));
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
    case GET_USER_POSTS:
      return { ...state, Posts: action.payload.Posts };
    case CREATE_POST:
      return { ...state, Post: action.payload };
    case UPDATE_POST:
      return { ...state, Post: action.payload };
    case DELETE_POST:
      return { ...state, Post: action.payload };
    default:
      return state;
  }
};

export default postReducer;
