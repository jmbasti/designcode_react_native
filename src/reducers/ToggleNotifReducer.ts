import { OPEN_NOTIF, CLOSE_NOTIF } from "../constants/constants";
const INITIAL_STATE = { isOpen: false };
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case OPEN_NOTIF:
      return { ...state, isOpen: action.payload };
    case CLOSE_NOTIF:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};
