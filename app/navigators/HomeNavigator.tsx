import React from "react"
import { ViewStyle } from "react-native"
import { HomeScreen } from "../screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

export function HomeNavigator() {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: $tabBar
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  )
}


const $tabBar: ViewStyle = {
  backgroundColor: "black",
  position: "absolute",
  bottom: 25,
  marginHorizontal: 20,
  height: 50,
  borderRadius: 30,
  shadowColor: "white",
  shadowOpacity: 0.06,
  shadowOffset: {
    width: 5,
    height: 5
  },
  paddingBottom: 0,
  zIndex: 5
}
