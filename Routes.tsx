import React, { useEffect } from "react";
//FIREBASE
import firebase from "firebase";

// REACT NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { StackNav } from "./src/navigator/StackNav";

// REDUX
import { Provider } from "react-redux";
import { store } from "./src/store";

// APOLLO
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/ldcl3ayg0mhx`,
  cache: new InMemoryCache(),
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer 93f3808c25c1f5bdb95476ca8576c6eaa12b5587efb956efb242ceead7cb3840`,
  },
});

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  // FIREBASE
  useEffect(() => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyBkgyFvQxPBg4RzFLX2yN-_rDWjy3g1d3E",
      authDomain: "designcode-react-native-ee2a2.firebaseapp.com",
      projectId: "designcode-react-native-ee2a2",
      storageBucket: "designcode-react-native-ee2a2.appspot.com",
      messagingSenderId: "1048205753891",
      appId: "1:1048205753891:web:6e48977668568839277b96",
      measurementId: "G-D27QV8BYG0",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }, []);
  return (
    // <ApolloProvider client={client}>
    <Provider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </Provider>
    // </ApolloProvider>
  );
};
