import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// TYPES
import { StackParamList } from "../types/StackScreenProps";
import { TabNav } from "./TabNav";

// SCREEN
import { SectionScreen } from "../screens/SectionScreen";
import { VideoScreen } from "../screens/VideoScreen";

const Stack = createStackNavigator<StackParamList>();

interface StackNavProps {}

export const StackNav: React.FC<StackNavProps> = ({}) => {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name='Home'
        component={TabNav}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name='Section'
        component={SectionScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name='Video'
        component={VideoScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
