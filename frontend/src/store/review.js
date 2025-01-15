const GET_POST_REVIEWS = "review/getPostReviews";

export const getPostReviewsAction = (reviews) => {
  return {
    type: GET_POST_REVIEWS,
    payload: reviews,
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

const initialState = {
  Reviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_REVIEWS:
      return { ...state, Reviews: action.payload.Reviews };
    default:
      return state;
  }
};

export default reviewReducer;
