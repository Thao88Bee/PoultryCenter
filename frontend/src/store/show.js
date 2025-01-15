const GET_ALL_SHOWS = "show/getAllShows";
const GET_ONE_SHOW = "show/getOneShow";

export const getAllShowsAction = (shows) => {
  return {
    type: GET_ALL_SHOWS,
    payload: shows,
  };
};

export const getOneShowAction = (show) => {
  return {
    type: GET_ONE_SHOW,
    payload: show,
  };
};

export const getAllShowsThunk = () => async (dispatch) => {
  const res = await fetch("/api/shows");

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllShowsAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const getOneShowThunk = (showId) => async (dispatch) => {
  const res = await fetch(`/api/shows/${showId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getOneShowAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

const initialState = {
  Shows: [],
  Show: {},
};

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SHOWS:
      return { ...state, Shows: action.payload.Shows };
    case GET_ONE_SHOW:
      return { ...state, Show: action.payload };
    default:
      return state;
  }
};

export default showReducer;
