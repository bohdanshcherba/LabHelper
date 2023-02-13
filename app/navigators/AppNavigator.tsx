import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { useColorScheme } from "react-native"
import { HomeNavigator } from "./HomeNavigator"
import { GorayevCounterScreen, LeukocytesCounterScreen } from "../screens"


const Stack = createNativeStackNavigator()

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
        <Stack.Screen name="HomeNavigation" component={HomeNavigator} />
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
