import { csrfFetch } from "./csrf";

const GET_POST_REVIEWS = "review/getPostReviews";
const GET_USER_REVIEWS = "review/getUserReviews";
const CREATE_REVIEW = "review/createReview";
const UPDATED_REVIEW = "review/updateReview";

export const getPostReviewsAction = (reviews) => {
  return {
    type: GET_POST_REVIEWS,
    payload: reviews,
  };
};

export const getUserReviewsAction = (reviews) => {
  return {
    type: GET_USER_REVIEWS,
    payload: reviews,
  };
};

export const createReviewAction = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review,
  };
};

export const updateReviewAction = (review) => {
  return {
    type: UPDATED_REVIEW,
    payload: review,
  };
};

export const getPostReviewThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getPostReviewsAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const getUserReviewsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/user/reviews");

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserReviewsAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const createReviewThunk = (newReview, postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}/reviews`, {
    method: "POST",
    headers: {
      "Context-type": "application/json",
    },
    body: JSON.stringify(newReview),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createReviewAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

const initialState = {
  Reviews: [],
  Review: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_REVIEWS:
      return { ...state, Reviews: action.payload.Reviews };
    case GET_USER_REVIEWS:
      return { ...state, Reviews: action.payload.Reviews };
    case CREATE_REVIEW:
      return { ...state, Review: action.payload };
    default:
      return state;
  }
};

export default reviewReducer;
