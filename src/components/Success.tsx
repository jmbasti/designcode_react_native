import React, { useRef, useEffect } from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { Animated, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

interface SuccessProps {
  isActive: boolean;
}

export const Success: React.FC<SuccessProps> = ({ isActive }) => {
  //
  const top = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const animation = useRef<any>(null);

  useEffect(() => {
    if (isActive) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, { toValue: 1, useNativeDriver: false }).start();

      animation.current.play();
    } else {
      Animated.timing(top, {
        toValue: screenHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, { toValue: 0, useNativeDriver: false }).start();

      animation.current.loop = false;
    }
  }, [isActive]);

  return (
    <AnimatedContainer style={{ top: top, opacity: opacity }}>
      <LottieView
        source={require("../../assets/lottie-checked-done.json")}
        autoPlay={false}
        loop={false}
        ref={animation}
      />
    </AnimatedContainer>
  );
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
