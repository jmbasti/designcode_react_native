import React, { useState, useRef, useEffect } from "react";
//FIREBASE
import firebase from "firebase";
// ASYNCSTORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import styled from "styled-components/native";
import {
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
// COMPONENTS
import { Success } from "./Success";
import { Loading } from "./Loading";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { loginClose } from "../actions/AuthActions";
import { RootState } from "../types/ReduxState";
import { updateName } from "../actions/NameAction";

// SCREEN HEIGHT
const screenHeight = Dimensions.get("window").height;

interface ModalLoginProps {}

export const ModalLogin: React.FC<ModalLoginProps> = ({}) => {
  // ASYNCSTORAGE STORE NAME
  const storeName = async (name: string) => {
    try {
      await AsyncStorage.setItem("name", name);
    } catch (e) {
      console.log(e);
    }
  };
  // ASYNCSTORAGE RETRIEVE NAME
  const retrieveName = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name !== null) {
        console.log(name);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // RETREIVE THE NAME
  useEffect(() => {
    retrieveName();
  }, []);

  // USESELECTOR
  const { isOpen } = useSelector((state: RootState) => state.login);
  // USEDISPATCH
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessful, setIsSuccessfull] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [iconEmail, setIconEmail] = useState(
    require("../../assets/icon-email.png")
  );
  const [iconPassword, setIconPassword] = useState(
    require("../../assets/icon-password.png")
  );
  const top = useRef(new Animated.Value(screenHeight)).current;
  const scale = useRef(new Animated.Value(1.3)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  //
  const handleLogin = () => {
    setIsLoading(true);
    //
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        Alert.alert("Error", error.message);
      })
      .then((response) => {
        setIsLoading(false);
        if (response) {
          setIsSuccessfull(true);
          //Alert.alert("Congrats", "You've logged successfully!");
          storeName(response.user.email);
          dispatch(updateName(response.user.email));
          setTimeout(() => {
            dispatch(loginClose());
            setIsSuccessfull(false);
          }, 1000);
        }
      });
  };
  //
  useEffect(() => {
    if (isOpen === true) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }

    if (isOpen === false) {
      setTimeout(() => {
        Animated.timing(top, {
          toValue: screenHeight,
          duration: 0,
          useNativeDriver: false,
        }).start();
        Animated.spring(scale, {
          toValue: 1.3,
          useNativeDriver: false,
        }).start();
      }, 500);

      Animated.timing(translateY, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen]);

  //
  const focusEmail = () => {
    setIconEmail(require("../../assets/icon-email-animated.gif"));
    setIconPassword(require("../../assets/icon-password.png"));
  };
  const focusPassword = () => {
    setIconPassword(require("../../assets/icon-password-animated.gif"));
    setIconEmail(require("../../assets/icon-email.png"));
  };
  const tapBackground = () => {
    Keyboard.dismiss();
    //Close Login
    dispatch(loginClose());
  };

  return (
    <AnimatedContainer style={{ top: top }}>
      <TouchableWithoutFeedback onPress={tapBackground}>
        <BlurView
          tint='default'
          intensity={100}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </TouchableWithoutFeedback>
      <AnimatedModal
        style={{
          transform: [{ scale: scale }, { translateY: translateY }],
        }}
      >
        <Logo source={require("../../assets/logo-dc.png")} />
        <Text>Start Learning. Access Pro Content.</Text>
        <TextInput
          autoCapitalize='none'
          value={email}
          onChangeText={(newEmail) => setEmail(newEmail)}
          placeholder='Email'
          keyboardType='email-address'
          onFocus={focusEmail}
        />
        <TextInput
          value={password}
          onChangeText={(newPassword) => setPassword(newPassword)}
          placeholder='Password'
          secureTextEntry={true}
          onFocus={focusPassword}
        />
        <IconEmail source={iconEmail} />
        <IconPassword source={iconPassword} />
        <TouchableOpacity onPress={handleLogin}>
          <Button>
            <ButtonText>Log In</ButtonText>
          </Button>
        </TouchableOpacity>
      </AnimatedModal>
      <Success isActive={isSuccessful} />
      <Loading isActive={isLoading} />
    </AnimatedContainer>
  );
};

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;
const AnimatedModal = Animated.createAnimatedComponent(Modal);
const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;
const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;
const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;
const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;
const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;
const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;
