import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MenuItemProps {
  icon: string;
  title: string;
  text: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, title, text }) => {
  return (
    <Container>
      <IconView>
        <Ionicons name={icon} size={24} color='#546bfb' />
      </IconView>
      <Content>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;
const Content = styled.View`
  padding-left: 20px;
`;
const Title = styled.Text`
  color: #3c4560;
  font-size: 24px;
  font-weight: 600;
`;
const Text = styled.Text`
  color: #3c4560;
  opacity: 0.6;
  font-weight: 600;
  margin-top: 5px;
`;
const IconView = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;
