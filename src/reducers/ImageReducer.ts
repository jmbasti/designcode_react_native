import { FETCH_IMAGE } from "../constants/constants";
const INITIAL_STATE = { photo: "" };
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCH_IMAGE:
      return { ...state, photo: action.payload };
    default:
      return state;
  }
};
