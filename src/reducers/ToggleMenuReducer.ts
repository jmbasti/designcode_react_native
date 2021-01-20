import { OPEN_MENU, CLOSE_MENU } from "../constants/constants";
const INITIAL_STATE = { isOpen: false };
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, isOpen: action.payload };
    case CLOSE_MENU:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};
