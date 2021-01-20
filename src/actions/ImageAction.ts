import { FETCH_IMAGE } from "../constants/constants";

// FETCH IMAGE
export const getImage = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      dispatch({
        type: FETCH_IMAGE,
        payload: data.results[0].picture.thumbnail,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
