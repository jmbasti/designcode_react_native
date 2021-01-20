import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, StatusBar, Linking, ScrollView } from "react-native";
import Markdown from "react-native-showdown";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
// COMPONENTS
import { PlayIcon } from "../components/Icons";

// TYPES
import { StackNavProps } from "../types/StackScreenProps";
import { Link } from "@react-navigation/native";

interface SectionScreenProps {}

export function SectionScreen({ navigation, route }: StackNavProps<"Section">) {
  // WebView
  const webRef: any = useRef();

  const { section } = route.params as any;
  const { title, image, logo, caption, subtitle, content } = section;
  // ANIMATION
  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    return () => {
      StatusBar.setBarStyle("dark-content", true);
    };
  }, []);

  return (
    <ScrollView>
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={image} />
          <PlayWrapper>
            <TouchableOpacity
              style={{ backgroundColor: "transparent" }}
              onPress={() => {
                navigation.navigate("Video");
              }}
            >
              <PlayView>
                <PlayIcon style={{ marginLeft: -10 }} />
              </PlayView>
            </TouchableOpacity>
          </PlayWrapper>
          <Wrapper>
            <Logo source={logo} />
            <Subtitle>{subtitle}</Subtitle>
          </Wrapper>
          <Title>{title}</Title>
          <Caption>{caption}</Caption>
        </Cover>
        <TouchableOpacity
          style={{ position: "absolute", top: 20, right: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <CloseView>
            <Ionicons name='ios-close' size={28} color='#4775f2' />
          </CloseView>
        </TouchableOpacity>
        <Content>
          <Title>{title}</Title>
          {/* <WebView
            source={{ html: section.content + htmlStyles }}
            ref={webRef}
            scalesPageToFit={false}
            scrollEnabled={false}
            onNavigationStateChange={(event) => {
              if (event.url != "about:blank") {
                webRef.current.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          /> */}
          <Markdown
            markdown={content}
            pureCSS={htmlStyles}
            scalesPageToFit={false}
            scrollEnabled={false}
          />
        </Content>
      </Container>
    </ScrollView>
  );
}

const Container = styled.View`
  flex: 1;
`;
const Image = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
`;
const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;
const Caption = styled.Text`
  font-size: 17px;
  color: #fff;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;
const Cover = styled.View`
  height: 375px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
`;
const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;
const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const Content = styled.View`
  height: 1000px;
  padding: 20px;
`;
const htmlContent = `
  <h2>This is a title</h2>
  <p>This <strong>is</strong> a <a href="http://designcode.io">link</a></p>
  <img src="https://cl.ly/c0b07504bfec/download/background4.jpg" />
`;

const htmlStyles = `
    * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 17px;
      font-weight: normal;
      color: #3c4560;
      line-height: 24px;
      text-align:justify;
    }
    h2 {
      font-size: 20px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 50px;
    }
  
    p {
      margin-top: 20px;
      color:red
      
      
    }
  
    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }
  
    strong {
      font-weight: 700;
    }
    img {
      width: 100%;
      border-radius: 10px;
      margin-top: 20px;
    }
    pre {
      padding: 20px;
      background: #212C4F;
      overflow: hidden;
      word-wrap: break-word;
      border-radius: 10px;
      margin-top: 20px;
    }
    
    code {
      color: white;
    }
`;
const PlayWrapper = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
`;

const PlayView = styled.View`
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;
