import { csrfFetch } from "./csrf";

const GET_ALL_SHOWS = "show/getAllShows";
const GET_ONE_SHOW = "show/getOneShow";
const GET_USER_SHOWS = "show/getUserShows";
const CREATE_SHOW = "show/createShow";
const UPDATE_SHOW = "show/updateShow";

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

export const getUserShowsAction = (shows) => {
  return {
    type: GET_USER_SHOWS,
    payload: shows,
  };
};

export const createShowAction = (show) => {
  return {
    type: CREATE_SHOW,
    payload: show,
  };
};

export const updateShowAction = (show) => {
  return {
    type: UPDATE_SHOW,
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

export const getUserShowsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/user/shows");

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserShowsAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const createShowThunk = (newShow) => async (dispatch) => {
  const res = await csrfFetch("/api/shows", {
    method: "POST",
    headers: {
      "Context-type": "application/json",
    },
    body: JSON.stringify(newShow),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createShowAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const updateShowThunk = (updatedShow, showId) => async (dispatch) => {
  const res = await csrfFetch(`/api/shows/${showId}`, {
    method: "PATCH",
    headers: {
      "Context-type": "application/json",
    },
    body: JSON.stringify(updatedShow),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateShowAction(data));
    return data;
  } else {
    const err = await res.jsoon();
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
    case GET_USER_SHOWS:
      return { ...state, Shows: action.payload.Shows };
    case CREATE_SHOW:
      return { ...state, Show: action.payload };
    case UPDATE_SHOW:
      return { ...state, Show: action.payload };
    default:
      return state;
  }
};

export default showReducer;
