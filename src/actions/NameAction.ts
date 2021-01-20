import { FETCH_NAME, UPDATE_NAME } from "../constants/constants";
// ASYNCSTORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

// FETCH NAME
export const getName = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      dispatch({
        type: FETCH_NAME,
        payload: data.results[0].name.first,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// UPDATE NAME
export const updateName = () => {
  return async (dispatch: any) => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name !== null) {
        dispatch({
          type: UPDATE_NAME,
          payload: name,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
