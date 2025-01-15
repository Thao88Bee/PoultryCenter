const GET_ALL_SHOWS = "show/getAllShows";

export const getAllShowsAction = (shows) => {
  return {
    type: GET_ALL_SHOWS,
    payload: shows,
  };
};

export const getAllShowsThunk = () => async (dispatch) => {
  const res = await fetch("/api/shows");

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllShowsAction(data));
    return data;
  } else {
    const error = await res.json();
    throw error;
  }
};

const initialState = {
  Shows: [],
};

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SHOWS:
      return { ...state, Shows: action.payload.Shows };
    default:
      return state;
  }
};

export default showReducer;
