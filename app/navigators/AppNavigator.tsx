import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { BackHandler, useColorScheme } from "react-native"
import { HomeNavigator } from "./HomeNavigator"
import { GorayevCounterScreen, LeukocytesCounterScreen } from "../screens"


const Stack = createNativeStackNavigator()

const handleBackButton = () => {
  BackHandler.exitApp()
  return true
}

const AppStack = () => {

  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false
        }
      }}
      initialRouteName={"Home"}
    >
      <Stack.Group>
        <Stack.Screen name="HomeNavigation" component={HomeNavigator}
                      listeners={{
                        focus: () => BackHandler.addEventListener("hardwareBackPress", handleBackButton)
                        , blur: () => BackHandler.removeEventListener("hardwareBackPress", handleBackButton)
                      }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="GorayevCounter" component={GorayevCounterScreen} />
        <Stack.Screen name="LeukocytesCounter" component={LeukocytesCounterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}


export const AppNavigator = () => {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppStack />
    </NavigationContainer>
  )
}
