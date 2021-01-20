import { OPEN_CARD, CLOSE_CARD } from "../constants/constants";

// OPEN MENU
export const cardOpen = () => {
  return async (dispatch: any) => {
    dispatch({
      type: OPEN_CARD,
      payload: true,
    });
  };
};

// CLOSE MENU
export const cardClose = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CLOSE_CARD,
      payload: false,
    });
  };
};
