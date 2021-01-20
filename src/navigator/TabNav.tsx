import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// NAVIGATION TYPES
import { TabParamList } from "../types/TabScreenProps";
// SCREENS
import { HomeScreen } from "../screens/HomeScreen";
import { CoursesScreen } from "../screens/CoursesScreen";
import { ProjectScreen } from "../screens/ProjectScreen(Swiper)";
//import { ProjectsScreen } from "../screens/ProjectsScreen(Swiper)";
// import { ProjectsScreen } from "../screens/ProjectsScreen";
// import ProjectsScreen from "../screens/ProjectsScreen_";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<TabParamList>();

interface TabNavProps {}

export const TabNav: React.FC<TabNavProps> = ({}) => {
  const activeColor = "#4775f2";
  const inActiveColor = "#b8bece";
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Courses") {
            iconName = "ios-albums";
          } else if (route.name === "Projects") {
            iconName = "ios-folder";
          }

          return (
            <Ionicons
              name={iconName}
              size={26}
              color={focused ? activeColor : inActiveColor}
            />
          );
        },
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
      <Tab.Screen name='Courses' component={CoursesScreen}></Tab.Screen>
      <Tab.Screen name='Projects' component={ProjectScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};
