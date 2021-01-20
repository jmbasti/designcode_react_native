import { combineReducers } from "redux";
import ImageReducer from "./ImageReducer";
import NameReducer from "./NameReducer";
import ToggleMenuReducer from "./ToggleMenuReducer";
import ToggleCardReducer from "./ToggleCardReducer";
import AuthReducers from "./AuthReducers";
import ToggleNotifReducer from "./ToggleNotifReducer";

export default combineReducers({
  menu: ToggleMenuReducer,
  card: ToggleCardReducer,
  image: ImageReducer,
  name: NameReducer,
  login: AuthReducers,
  notification: ToggleNotifReducer,
});
