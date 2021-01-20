import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import styled from "styled-components/native";
// DUMMY DATA
import { logos } from "../components/data/logos";
import { cards } from "../components/data/cards";
import { courses } from "../components/data/courses";
// COMPONENTS
import { Card } from "../../src/components/Card";
import { Logo } from "../../src/components/Logo";
import { Course } from "../../src/components/Course";
import { Menu } from "../../src/components/Menu";
import { Avatar } from "../components/Avatar";
import { NotificationButton } from "../components/NotificationButton";
import { Notifications } from "../components/Notifications";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { openMenu } from "../actions/ToggleMenuActions";
import { loginOpen } from "../actions/AuthActions";
import { RootState } from "../types/ReduxState";
import { updateName } from "../actions/NameAction";
import { openNotif } from "../actions/ToggleNotifActions";
// TYPES
import { StackNavProps } from "../types/StackScreenProps";
// APOLLO
import { useQuery } from "@apollo/client";
import { CARDS_QUERY } from "../query/query";
import { ModalLogin } from "../components/ModalLogin";

interface HomeScreenProps {}

export function HomeScreen({ navigation, route }: StackNavProps<"Home">) {
  // APOLLO
  // const { loading, error, data } = useQuery(CARDS_QUERY);
  // if (loading) return <Message>Loading...</Message>;
  // if (error) return <Message>Error :(</Message>;
  // const {
  //   cardsCollection: { items },
  // } = data;

  // USESELECTOR
  const { isOpen } = useSelector((state: RootState) => state.menu);
  const { name } = useSelector((state: RootState) => state.name);
  const { updatedName } = useSelector((state: RootState) => state.name);
  // USEDISPATCH
  const dispatch = useDispatch();

  // Animation
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    //dispatch(getName());
    dispatch(updateName());
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
  }, []);

  useEffect(() => {
    toggleMenu();
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen === true) {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: true,
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }
    if (isOpen === false) {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };

  const handleAvatar = () => {
    if (updatedName) {
      dispatch(openMenu());
    } else {
      dispatch(loginOpen());
    }
  };

  return (
    <RootView>
      <Menu />
      <Notifications />
      <AnimatedContainer
        style={{ transform: [{ scale: scale }], opacity: opacity }}
      >
        <SafeAreaView>
          <ScrollView style={{ height: "100%" }}>
            <TitleBar>
              <TouchableOpacity
                onPress={handleAvatar}
                style={{ position: "absolute", top: 0 }}
              >
                <Avatar />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>{updatedName}</Name>
              <TouchableOpacity
                onPress={() => dispatch(openNotif())}
                style={{ position: "absolute", right: 20, top: 5 }}
              >
                <NotificationButton />
              </TouchableOpacity>
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {logos.map(({ image, text }, index) => {
                return <Logo image={image} text={text} key={index} />;
              })}
            </ScrollView>
            {/* SUBTITLE */}
            <Subtitle>{"Continue Learning".toUpperCase()}</Subtitle>
            {/* CARDS */}
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              <CardContainer>
                {/* Change if Apollo/Grapql will be used!!! */}
                {cards.map((card: any, index: number) => {
                  const {
                    title,
                    image,
                    logo,
                    caption,
                    subtitle,
                    content,
                  } = card;

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Section", { section: card })
                      }
                      key={index}
                    >
                      <Card
                        title={title}
                        image={image}
                        logo={logo}
                        caption={caption}
                        subtitle={subtitle}
                        content={content}
                      />
                    </TouchableOpacity>
                  );
                })}
              </CardContainer>
            </ScrollView>
            <Subtitle>{"Popular Courses".toUpperCase()}</Subtitle>
            <CoursesContainer>
              {courses.map(
                (
                  { image, title, subtitle, logo, avatar, caption, author },
                  index
                ) => {
                  return (
                    <Course
                      image={image}
                      title={title}
                      subtitle={subtitle}
                      logo={logo}
                      avatar={avatar}
                      caption={caption}
                      author={author}
                      key={index}
                    />
                  );
                }
              )}
            </CoursesContainer>
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
      <ModalLogin />
    </RootView>
  );
}
// CUSTOM
// STYLED COMPONENTS
const RootView = styled.View`
  background: #000;
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: #b8bece;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;
const CardContainer = styled.View`
  flex-direction: row;
`;

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
