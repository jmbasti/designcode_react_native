import { OPEN_LOGIN, CLOSE_LOGIN, LOGIN, LOGOUT } from "../constants/constants";
// ASYNCSTORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";
//FIREBASE
import firebase from "firebase";

// OPEN MENU
export const loginOpen = () => {
  return async (dispatch: any) => {
    dispatch({
      type: OPEN_LOGIN,
      payload: true,
    });
  };
};

// CLOSE MENU
export const loginClose = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CLOSE_LOGIN,
      payload: false,
    });
  };
};
// LOGIN TO FIREBASE
// export const login = (email, password) => {
//   return async (dispatch: any) => {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .catch(function (error) {
//         Alert.alert("Error", error.message);
//       })
//       .then((response) => {
//         setIsLoading(false);
//         if (response) {
//           setIsSuccessfull(true);
//           Alert.alert("Congrats", "You've logged successfully!");
//           storeName(response.user.email);
//           dispatch(updateName(response.user.email));
//           setTimeout(() => {
//             dispatch(loginClose());
//             setIsSuccessfull(false);
//           }, 1000);
//         }
//       });
//     dispatch({
//       type: LOGIN,
//       payload: true,
//     });
//   };
// };

// LOGOUT
export const logout = () => {
  return async (dispatch: any) => {
    AsyncStorage.clear();
    dispatch({
      type: LOGOUT,
    });
  };
};
