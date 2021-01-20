import { OPEN_LOGIN, CLOSE_LOGIN, LOGIN, LOGOUT } from "../constants/constants";
const INITIAL_STATE = { isOpen: false, email: null };
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case OPEN_LOGIN:
      return { ...state, isOpen: action.payload };
    case CLOSE_LOGIN:
      return { ...state, isOpen: action.payload };
    case LOGIN:
      return { ...state, email: action.payload };
    // case LOGOUT:
    //   return {};
    default:
      return state;
  }
};
