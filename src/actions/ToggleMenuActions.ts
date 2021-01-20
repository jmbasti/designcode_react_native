import { OPEN_MENU, CLOSE_MENU } from "../constants/constants";

// OPEN MENU
export const openMenu = () => {
  return async (dispatch: any) => {
    dispatch({
      type: OPEN_MENU,
      payload: true,
    });
  };
};

// CLOSE MENU
export const closeMenu = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CLOSE_MENU,
      payload: false,
    });
  };
};
