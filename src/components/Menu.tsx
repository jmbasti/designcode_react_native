import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
// COMPONENTS
import { MenuItem } from "./MenuItem";
//DUMMY DATA
import { menuItems } from "./data/menuItems";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../actions/ToggleMenuActions";
import { updateName } from "../actions/NameAction";
import { logout } from "../actions/AuthActions";
import { RootState } from "../types/ReduxState";

// REDUX
import { getName } from "../actions/NameAction";

// SCREEN HEIGHT
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
let cardWidth = screenWidth;

// IPAD
if (screenWidth > 500) {
  cardWidth = 500;
}

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
  // USESELECTOR
  const { isOpen } = useSelector((state: RootState) => state.menu);
  const { name } = useSelector((state: RootState) => state.name);

  useEffect(() => {
    dispatch(getName());
  }, []);

  // USEDISPATCH
  const dispatch = useDispatch();

  // TOGGLE SPRING ANIMATION
  const top = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    toggleMenu();
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen === true) {
      Animated.spring(top, {
        toValue: 54,
        useNativeDriver: false,
      }).start();
    }
    if (isOpen === false) {
      Animated.spring(top, {
        toValue: screenHeight,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleMenu = (index: number) => {
    if (index === 3) {
      dispatch(closeMenu());
      dispatch(logout());
      // dispatch(updateName());
      // AsyncStorage.clear();
    }
  };

  return (
    <AnimatedContainer style={{ top: top }}>
      <Container>
        <Cover>
          <Image source={require("../../assets/background2.jpg")} />
          <Title>{name}</Title>
          <Subtitle>Designer at Design+Code</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={() => dispatch(closeMenu())}
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            marginLeft: -22,
            zIndex: 1,
          }}
        >
          <CloseView>
            <Ionicons name='ios-close' size={24} color='#546bfb' />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {menuItems.map(({ icon, title, text }, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => handleMenu(index)}>
                <MenuItem icon={icon} title={title} text={text} />
              </TouchableOpacity>
            );
          })}
        </Content>
      </Container>
    </AnimatedContainer>
  );
};

const Container = styled.View`
  position: absolute;
  background: #fff;
  width: ${cardWidth}px;
  align-self: center;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Cover = styled.View`
  height: 142px;
  background: #000;
  justify-content: center;
  align-items: center;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #fff;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Content = styled.View`
  height: ${screenHeight}px;
  background: #f0f3f5;
  padding: 50px;
`;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
`;
const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin-top: 4px;
`;
