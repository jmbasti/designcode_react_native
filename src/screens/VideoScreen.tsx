import React from "react";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Dimensions } from "react-native";
// TYPES
import { StackNavProps } from "../types/StackScreenProps";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

interface VideoScreenProps {}

export function VideoScreen({ navigation, route }: StackNavProps<"Video">) {
  return (
    <Container>
      <Video
        source={{
          uri:
            "https://player.vimeo.com/external/281472837.hd.mp4?s=c78b611b5055e373c69b6dd7674e2051128bc7b8&profile_id=175",
        }}
        shouldPlay
        useNativeControls={true}
        resizeMode='cover'
        style={{ width: screenWidth, height: 210 }}
      />
      <CloseView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ padding: 20 }}
        >
          <Ionicons name='ios-close' size={28} color='#fff' />
        </TouchableOpacity>
      </CloseView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background: black;
  align-items: center;
  justify-content: center;
`;

const CloseView = styled.View`
  position: absolute;
  top: 0px;
  right: 12px;
`;
