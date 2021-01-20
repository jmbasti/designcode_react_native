import { OPEN_NOTIF, CLOSE_NOTIF } from "../constants/constants";

// OPEN MENU
export const openNotif = () => {
  return async (dispatch: any) => {
    dispatch({
      type: OPEN_NOTIF,
      payload: true,
    });
  };
};

// CLOSE MENU
export const closeNotif = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CLOSE_NOTIF,
      payload: false,
    });
  };
};
