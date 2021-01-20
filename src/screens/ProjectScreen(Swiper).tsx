import React, { useState, useRef } from "react";
import Swiper from "react-native-deck-swiper";
import styled from "styled-components/native";
//COMPONENTS
import { Projects } from "../components/Projects(Swiper)";
//DUMMY DATA
import { projects } from "../components/data/projects";
// TYPES
import { StackNavProps } from "../types/StackScreenProps";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { cardOpen, cardClose } from "../actions/ToggleCardActions";
import { RootState } from "../types/ReduxState";

interface ProjectScreenProps {}
const stackSize = 3;

export const ProjectScreen: React.FC<ProjectScreenProps> = ({}) => {
  const swiperRef = useRef().current;
  const [index, setIndex] = useState(0);
  const onSwiped = () => {
    setIndex((index + 1) % projects.length);
  };
  return (
    <Container>
      <Swiper
        ref={swiperRef}
        cards={projects}
        cardIndex={index}
        renderCard={({ image, title, author, text }) => (
          <Wrapper>
            <Projects image={image} title={title} author={author} text={text} />
          </Wrapper>
        )}
        infinite
        onSwiped={onSwiped}
        stackSize={stackSize}
        stackScale={10}
        stackSeparation={14}
        disableTopSwipe
        disableBottomSwipe
      />
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f3f5;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
