import { OPEN_CARD, CLOSE_CARD } from "../constants/constants";
const INITIAL_STATE = { isOpen: false };
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case OPEN_CARD:
      return { ...state, isOpen: action.payload };
    case CLOSE_CARD:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};
