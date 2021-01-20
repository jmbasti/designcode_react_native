import { FETCH_NAME, UPDATE_NAME, LOGOUT } from "../constants/constants";
const INITIAL_STATE = { name: "", updatedName: "" };
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCH_NAME:
      return { ...state, name: action.payload };
    case UPDATE_NAME:
      return { ...state, updatedName: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
