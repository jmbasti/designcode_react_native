import React from "react";
import { ImageProps, Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get("window").width;
let cardWidth = screenWidth - 40;

// IPAD
if (screenWidth >= 768) {
  cardWidth = (screenWidth - 60) / 2;
}
// IPAD LANDSCAPE
if (screenWidth >= 1024) {
  cardWidth = (screenWidth - 80) / 3;
}

interface CourseProps {
  image: ImageProps["source"];
  logo: ImageProps["source"];
  subtitle: string;
  title: string;
  avatar: ImageProps["source"];
  caption: string;
  author: string;
}

export const Course: React.FC<CourseProps> = ({
  image,
  logo,
  subtitle,
  title,
  avatar,
  caption,
  author,
}) => {
  return (
    <Container style={{ width: cardWidth }}>
      <Cover>
        <Image source={image} />
        <Logo source={logo} resizeMode='contain' />
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
      </Cover>
      <Content>
        <Avatar source={avatar} />
        <Caption>{caption}</Caption>
        <Author>Taught by {author}</Author>
      </Content>
    </Container>
  );
};

// CUSTOM
// STYLED COMPONENTS
const Container = styled.View`
  width: 335px;
  height: 335px;
  background: #fff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;
const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;
const Image = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
`;
const Logo = styled.Image`
  height: 48px;
  width: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;
const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 170px;
`;
const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 20px;
`;
const Avatar = styled.Image`
  height: 32px;
  width: 32px;
  position: absolute;
  border-radius: 16px;
  top: 20px;
  left: 20px;
`;
const Content = styled.View`
  padding-left: 62px;
  height: 75px;
  justify-content: center;
`;
const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;
const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
`;
