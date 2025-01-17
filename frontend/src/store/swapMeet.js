import { csrfFetch } from "./csrf";

const GET_ALL_SWAP_MEETS = "swapMeet/getAllSwapMeets";
const GET_ONE_SWAP_MEET = "swapMeet/getOneSwapMeet";
const GET_USER_SWAP_MEETS = "swapMeet/getUserSwapMeets";
const CREATE_SWAP_MEET = "swapMeet/createSwapMeet";
const UPDATE_SWAMP_MEET = "swapMeet/updateSwapMeet";

export const getAllSwapMeetsAction = (swapMeets) => {
  return {
    type: GET_ALL_SWAP_MEETS,
    payload: swapMeets,
  };
};

export const getOneSwapMeetAction = (swapMeet) => {
  return {
    type: GET_ONE_SWAP_MEET,
    payload: swapMeet,
  };
};

export const getUserSwapMeetsAction = (swapMeets) => {
  return {
    type: GET_USER_SWAP_MEETS,
    payload: swapMeets,
  };
};

export const createSwapMeetAction = (swapMeet) => {
  return {
    type: CREATE_SWAP_MEET,
    payload: swapMeet,
  };
};

export const updateSwapMeetAction = (swapMeet) => {
  return {
    type: UPDATE_SWAMP_MEET,
    payload: swapMeet,
  };
};

export const getAllSwapMeetsThunk = () => async (dispatch) => {
  const res = await fetch("/api/swapMeets");

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllSwapMeetsAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const getOneSwapMeetThunk = (swapMeetId) => async (dispatch) => {
  const res = await fetch(`/api/swapMeets/${swapMeetId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getOneSwapMeetAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const getUserSwapMeetsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/user/swapMeets");

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserSwapMeetsAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const createSwapMeetThunk = (newSwapMeet) => async (dispatch) => {
  const res = await csrfFetch("/api/swapMeets", {
    method: "POST",
    headers: {
      "Context-type": "application/json",
    },
    body: JSON.stringify(newSwapMeet),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createSwapMeetAction(data));
    return data;
  } else {
    const err = await res.json();
    throw err;
  }
};

export const updateSwapMeetThunk =
  (updatedSwapMeet, swapMeetId) => async (dispatch) => {
    const res = await csrfFetch(`/api/swapMeets/${swapMeetId}`, {
      method: "PATCH",
      headers: {
        "Context-type": "application/json",
      },
      body: JSON.stringify(updatedSwapMeet),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateSwapMeetAction(data));
      return data;
    } else {
      const err = await res.json();
      throw err;
    }
  };

const initialState = {
  Swaps: [],
  Swap: {},
};

const swapMeetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SWAP_MEETS:
      return { ...state, Swaps: action.payload.Swaps };
    case GET_ONE_SWAP_MEET:
      return { ...state, Swap: action.payload };
    case GET_USER_SWAP_MEETS:
      return { ...state, Swaps: action.payload.Swaps };
    case CREATE_SWAP_MEET:
      return { ...state, Swap: action.payload };
    case UPDATE_SWAMP_MEET:
      return { ...state, Swap: action.payload };
    default:
      return state;
  }
};

export default swapMeetReducer;
