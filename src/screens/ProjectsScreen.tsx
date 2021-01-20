import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/native";
import { PanResponder, Animated } from "react-native";
// COMPONENTS
import { Projects } from "../components/Projects";
//DUMMY DATA
import { projects } from "../components/data/projects";
// TYPES
import { StackNavProps } from "../types/StackScreenProps";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { cardOpen, cardClose } from "../actions/ToggleCardActions";
import { RootState } from "../types/ReduxState";

interface ProjectsScreenProps {}

export function ProjectsScreen({
  navigation,
  route,
}: StackNavProps<"Projects">) {
  // USESELECTOR
  const { isOpen } = useSelector((state: RootState) => state.card);
  // USEDISPATCH
  const dispatch = useDispatch();
  // TO BE REPAIRED!!!!!
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  // ANIMATION LOOP CARD
  const [index, setIndex] = useState(0);
  // TO BE REPAIRED!!!!!
  const getNextIndex = (index: number) => {
    let nextIndex = index + 1;
    if (nextIndex > projects.length - 1) {
      return 0;
    }
    return nextIndex;
  };
  //
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const thirdScale = useRef(new Animated.Value(0.8)).current;
  const thirdTranslateY = useRef(new Animated.Value(-50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const reset = () => {
    // RESET
    pan.setValue({ x: 0, y: 0 });
    scale.setValue(0.9);
    translateY.setValue(44);
    thirdScale.setValue(0.8);
    thirdTranslateY.setValue(-50);
    // TO BE REPAIRED!!!!!
    setIndex(getNextIndex(index));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (isOpen === true) {
            return false;
          } else {
            return true;
          }
        }
      },
      onPanResponderGrant: () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
        Animated.spring(thirdScale, {
          toValue: 0.9,
          useNativeDriver: false,
        }).start();
        Animated.spring(thirdTranslateY, {
          toValue: 44,
          useNativeDriver: false,
        }).start();
        Animated.timing(opacity, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        const positionY = Number(JSON.stringify(pan.y));
        Animated.timing(opacity, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
        if (positionY > 200) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
            useNativeDriver: false,
          }).start(reset);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: false,
          }).start();
          Animated.spring(translateY, {
            toValue: 44,
            useNativeDriver: false,
          }).start();
          Animated.spring(thirdScale, {
            toValue: 0.8,
            useNativeDriver: false,
          }).start();
          Animated.spring(thirdTranslateY, {
            toValue: -50,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Container>
      <AnimatedMask style={{ opacity: opacity }} />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Projects
          title={projects[index].title}
          image={projects[index].image}
          author={projects[index].author}
          text={projects[index].text}
          canOpen={true}
        />
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: scale }, { translateY: translateY }],
        }}
      >
        <Projects
          title={projects[getNextIndex(index)].title}
          image={projects[getNextIndex(index)].image}
          author={projects[getNextIndex(index)].author}
          text={projects[getNextIndex(index)].text}
        />
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -3,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: thirdScale }, { translateY: thirdTranslateY }],
        }}
      >
        <Projects
          title={projects[getNextIndex(index + 1)].title}
          image={projects[getNextIndex(index + 1)].image}
          author={projects[getNextIndex(index + 1)].author}
          text={projects[getNextIndex(index + 1)].text}
        />
      </Animated.View>
    </Container>
  );
}

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;
const AnimatedMask = Animated.createAnimatedComponent(Mask);
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f3f5;
`;

// import React, { useRef, useState } from "react";
// import styled from "styled-components/native";
// import { Projects } from "../components/Projects";
// import { PanResponder, Animated } from "react-native";
// import { projects } from "../components/data/projects";
// // TYPES
// import { StackNavProps } from "../types/StackScreenProps";

// interface ProjectsScreenProps {}

// export function ProjectsScreen({
//   navigation,
//   route,
// }: StackNavProps<"Projects">) {
//   // ANIMATION LOOP CARD
//   const [index, setIndex] = useState(0);
//   const getNextIndex = (index: number) => {
//     let nextIndex = index + 1;
//     if (nextIndex > projects.length - 1) {
//       return 0;
//     }
//     return nextIndex;
//   };

//   const pan = useRef(new Animated.ValueXY()).current;
//   const scale = useRef(new Animated.Value(0.9)).current;
//   const translateY = useRef(new Animated.Value(44)).current;
//   const thirdScale = useRef(new Animated.Value(0.8)).current;
//   const thirdTranslateY = useRef(new Animated.Value(-50)).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
//         Animated.spring(translateY, {
//           toValue: 0,
//           useNativeDriver: false,
//         }).start();
//         Animated.spring(thirdScale, {
//           toValue: 0.9,
//           useNativeDriver: false,
//         }).start();
//         Animated.spring(thirdTranslateY, {
//           toValue: 44,
//           useNativeDriver: false,
//         }).start();
//       },
//       onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
//         useNativeDriver: false,
//       }),
//       onPanResponderRelease: () => {
//         const positionY = Number(JSON.stringify(pan.y));
//         if (positionY > 200) {
//           Animated.timing(pan, {
//             toValue: { x: 0, y: 1000 },
//             useNativeDriver: false,
//           }).start(() => {
//             // RESET
//             pan.setValue({ x: 0, y: 0 });
//             scale.setValue(0.9);
//             translateY.setValue(44);
//             thirdScale.setValue(0.8);
//             thirdTranslateY.setValue(-50);
//             setIndex(getNextIndex(index));
//           });
//         } else {
//           Animated.spring(pan, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: false,
//           }).start();
//           Animated.spring(scale, {
//             toValue: 0.9,
//             useNativeDriver: false,
//           }).start();
//           Animated.spring(translateY, {
//             toValue: 44,
//             useNativeDriver: false,
//           }).start();
//           Animated.spring(thirdScale, {
//             toValue: 0.8,
//             useNativeDriver: false,
//           }).start();
//           Animated.spring(thirdTranslateY, {
//             toValue: -50,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   return (
//     <Container>
//       <Animated.View
//         style={{
//           transform: [{ translateX: pan.x }, { translateY: pan.y }],
//         }}
//         {...panResponder.panHandlers}
//       >
//         <Projects
//           title={projects[index].title}
//           image={projects[index].image}
//           author={projects[index].author}
//           text={projects[index].text}
//         />
//       </Animated.View>

//       <Animated.View
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           zIndex: -1,
//           width: "100%",
//           height: "100%",
//           justifyContent: "center",
//           alignItems: "center",
//           transform: [{ scale: scale }, { translateY: translateY }],
//         }}
//       >
//         <Projects
//           title={projects[getNextIndex(index)].title}
//           image={projects[getNextIndex(index)].image}
//           author={projects[getNextIndex(index)].author}
//           text={projects[getNextIndex(index)].text}
//         />
//       </Animated.View>

//       <Animated.View
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           zIndex: -3,
//           width: "100%",
//           height: "100%",
//           justifyContent: "center",
//           alignItems: "center",
//           transform: [{ scale: thirdScale }, { translateY: thirdTranslateY }],
//         }}
//       >
//         <Projects
//           title={projects[getNextIndex(index + 1)].title}
//           image={projects[getNextIndex(index + 1)].image}
//           author={projects[getNextIndex(index + 1)].author}
//           text={projects[getNextIndex(index + 1)].text}
//         />
//       </Animated.View>
//     </Container>
//   );
// }
// const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: #f0f3f5;
// `;
