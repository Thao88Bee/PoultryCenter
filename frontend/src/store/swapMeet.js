const GET_ALL_SWAP_MEETS = "swapMeet/getAllSwapMeets";
const GET_ONE_SWAP_MEET = "swapMeet/getOneSwapMeet";

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
    default:
      return state;
  }
};

export default swapMeetReducer;
