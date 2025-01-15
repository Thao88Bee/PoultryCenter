const GET_ALL_SWAP_MEETS = "swapMeet/getAllSwapMeets";

export const getAllSwapMeetsAction = (swapMeets) => {
  return {
    type: GET_ALL_SWAP_MEETS,
    payload: swapMeets,
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

const initialState = {
  Swaps: [],
};

const swapMeetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SWAP_MEETS:
      return { ...state, Swaps: action.payload.Swaps };
    default:
      return state;
  }
};

export default swapMeetReducer;
