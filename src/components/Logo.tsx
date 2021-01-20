import React from "react";
import { ImageProps } from "react-native";
import styled from "styled-components/native";

interface LogoProps {
  image: ImageProps["source"];
  text: string;
}

export const Logo: React.FC<LogoProps> = ({ image, text }) => {
  return (
    <Container>
      <Image source={image} resizeMode='contain' />
      <Text>{text}</Text>
    </Container>
  );
};

// CUSTOM
// STYLED COMPONENTS
const Container = styled.View`
  flex-direction: row;
  background: #fff;
  height: 60px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  margin: 0 8px;
`;
const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
`;
