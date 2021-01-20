import React from "react";
import styled from "styled-components/native";
import { Projects } from "../components/Projects";
import { PanResponder, Animated } from "react-native";
import { projects } from "../components/data/projects";

// import { connect } from "react-redux";

// function mapStateToProps(state: any) {
//   return {
//     action: state.action,
//   };
// }

// function getNextIndex(index: number) {
//   var nextIndex = index + 1;
//   if (nextIndex > projects.length - 1) {
//     return 0;
//   }
//   return nextIndex;
// }

// class ProjectsScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };

//   state = {
//     pan: new Animated.ValueXY(),
//     scale: new Animated.Value(0.9),
//     translateY: new Animated.Value(44),
//     thirdScale: new Animated.Value(0.8),
//     thirdTranslateY: new Animated.Value(-50),
//     index: 0,
//     opacity: new Animated.Value(0),
//   };

//   componentWillMount() {
//     this._panResponder = PanResponder.create({
//       // onMoveShouldSetPanResponder: (event, gestureState) => {
//       //   if (gestureState.dx === 0 && gestureState.dy === 0) {
//       //     return false;
//       //   } else {
//       //     if (this.props.action === "openCard") {
//       //       return false;
//       //     } else {
//       //       return true;
//       //     }
//       //   }
//       // },
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         Animated.spring(this.state.scale, {
//           toValue: 1,
//           useNativeDriver: false,
//         }).start();
//         Animated.spring(this.state.translateY, {
//           toValue: 0,
//           useNativeDriver: false,
//         }).start();

//         Animated.spring(this.state.thirdScale, {
//           toValue: 0.9,
//           useNativeDriver: false,
//         }).start();
//         Animated.spring(this.state.thirdTranslateY, {
//           toValue: 44,
//           useNativeDriver: false,
//         }).start();

//         Animated.timing(this.state.opacity, {
//           toValue: 1,
//           useNativeDriver: false,
//         }).start();
//       },

//       onPanResponderMove: Animated.event([
//         null,
//         { dx: this.state.pan.x, dy: this.state.pan.y },
//       ]),

//       onPanResponderRelease: () => {
//         const positionY = Number(JSON.stringify(this.state.pan.y));
//         Animated.timing(this.state.opacity, {
//           toValue: 0,
//           useNativeDriver: false,
//         }).start();
//         // console.log(positionY);

//         if (positionY > 200) {
//           Animated.timing(this.state.pan, {
//             toValue: { x: 0, y: 1000 },
//             useNativeDriver: false,
//           }).start(() => {
//             this.state.pan.setValue({ x: 0, y: 0 });
//             this.state.scale.setValue(0.9);
//             this.state.translateY.setValue(44);
//             this.state.thirdScale.setValue(0.8);
//             this.state.thirdTranslateY.setValue(-50);
//             this.setState({ index: getNextIndex(this.state.index) });
//           });
//         } else {
//           Animated.spring(this.state.pan, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: false,
//           }).start();

//           Animated.spring(this.state.scale, {
//             toValue: 0.9,
//             useNativeDriver: false,
//           }).start();
//           Animated.spring(this.state.translateY, {
//             toValue: 44,
//             useNativeDriver: false,
//           }).start();

//           Animated.spring(this.state.thirdScale, {
//             toValue: 0.8,
//             useNativeDriver: false,
//           }).start();
//           Animated.spring(this.state.thirdTranslateY, {
//             toValue: -50,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     });
//   }

//   render() {
//     return (
//       <Container>
//         {/* <AnimatedMask style={{ opacity: this.state.opacity }} /> */}
//         <Animated.View
//           style={{
//             transform: [
//               { translateX: this.state.pan.x },
//               { translateY: this.state.pan.y },
//             ],
//           }}
//           {...this._panResponder.panHandlers}
//         >
//           <Projects
//             title={projects[this.state.index].title}
//             image={projects[this.state.index].image}
//             author={projects[this.state.index].author}
//             text={projects[this.state.index].text}
//             //canOpen={true}
//           />
//         </Animated.View>
//         <Animated.View
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             zIndex: -1,
//             width: "100%",
//             height: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             transform: [
//               { scale: this.state.scale },
//               { translateY: this.state.translateY },
//             ],
//           }}
//         >
//           <Projects
//             title={projects[getNextIndex(this.state.index)].title}
//             image={projects[getNextIndex(this.state.index)].image}
//             author={projects[getNextIndex(this.state.index)].author}
//             text={projects[getNextIndex(this.state.index)].text}
//           />
//         </Animated.View>
//         <Animated.View
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             zIndex: -3,
//             width: "100%",
//             height: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             transform: [
//               { scale: this.state.thirdScale },
//               { translateY: this.state.thirdTranslateY },
//             ],
//           }}
//         >
//           <Projects
//             title={projects[getNextIndex(this.state.index + 1)].title}
//             image={projects[getNextIndex(this.state.index + 1)].image}
//             author={projects[getNextIndex(this.state.index + 1)].author}
//             text={projects[getNextIndex(this.state.index + 1)].text}
//           />
//         </Animated.View>
//       </Container>
//     );
//   }
// }

// // export default connect(mapStateToProps)(ProjectsScreen);

// export default ProjectsScreen;

// const Mask = styled.View`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.25);
//   z-index: -3;
// `;

// const AnimatedMask = Animated.createAnimatedComponent(Mask);

// const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background: #f0f3f5;
// `;

// const Text = styled.Text``;
