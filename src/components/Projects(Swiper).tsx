import React, { useRef } from "react";
import {
  ImageProps,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { cardOpen, cardClose } from "../actions/ToggleCardActions";
import { RootState } from "../types/ReduxState";

// Screen Dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabBarHeight = 75; // value depends on device

interface ProjectsProps {
  image: ImageProps["source"];
  title: string;
  author: string;
  text: string;
  canOpen?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({
  image,
  title,
  author,
  text,
  canOpen,
}) => {
  // USESELECTOR
  const { isOpen } = useSelector((state: RootState) => state.card);
  // USEDISPATCH
  const dispatch = useDispatch();
  // ANIMATION
  const cardWidth = useRef(new Animated.Value(315)).current;
  const cardHeight = useRef(new Animated.Value(460)).current;
  const titleTop = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const textHeight = useRef(new Animated.Value(100)).current;
  // Open Card
  const openCard = () => {
    Animated.spring(cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: screenHeight - tabBarHeight,
      useNativeDriver: false,
    }).start();
    Animated.spring(titleTop, {
      toValue: 40,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
    Animated.spring(textHeight, {
      toValue: 1000,
      useNativeDriver: false,
    }).start();
    StatusBar.setHidden(true);
    dispatch(cardOpen());
  };

  // Close Card
  const closeCard = () => {
    Animated.spring(cardWidth, {
      toValue: 315,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: 460,
      useNativeDriver: false,
    }).start();
    Animated.spring(titleTop, {
      toValue: 20,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    Animated.spring(textHeight, {
      toValue: 100,
      useNativeDriver: false,
    }).start();
    StatusBar.setHidden(false);
    dispatch(cardClose());
  };
  return (
    <TouchableWithoutFeedback onPress={openCard}>
      <AnimatedContainer style={{ width: cardWidth, height: cardHeight }}>
        <Cover>
          <Image source={image} />
          <AnimatedTitle style={{ top: titleTop }}>{title}</AnimatedTitle>
          <Author>{author}</Author>
        </Cover>
        <AnimnatedText style={{ height: textHeight }}>{text}</AnimnatedText>
        <AnimatedLinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
          style={{
            position: "absolute",
            top: 330,
            width: "100%",
            height: textHeight,
          }}
        />
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20 }}
          onPress={closeCard}
        >
          <AnimatedCloseView style={{ opacity: opacity }}>
            <Ionicons name='ios-close' size={32} color='#546bfb' />
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;
const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;
const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;
const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);
const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  text-transform: uppercase;
`;
const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;

const AnimnatedText = Animated.createAnimatedComponent(Text);
