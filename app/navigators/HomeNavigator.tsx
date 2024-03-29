import React, { useEffect } from "react"
import { BackHandler, ViewStyle } from "react-native"
import {
  GorayevListScreen,
  LeukocytesListScreen, EntriesScreen,
  FilesScreen, CalendarScreen
} from "../screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "../components"


const Tab = createBottomTabNavigator()

export function HomeNavigator() {
  
  const tabNavigationOption = ({ route }) => ({

    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: "",
    tabBarStyle: $tabBar,

    tabBarVisible: true,
    tabBarIcon: ({ focused }) => {
      let iconName

      if (route.name === "Leukocytes") {
        iconName = "atom"
      }
      if (route.name === "Gorayev") {
        iconName = "square"
      }
      if (route.name === "Calendar") {
        iconName = "calendar1"
      }
      if (route.name === "Statistic") {
        iconName = "pig"
      }
      if (route.name === "Files") {
        iconName = "file"
      }

      return <Icon icon={iconName} color={focused ? "#E53935" : "#000000"} size={35} />
    }
  })


  return (
    <Tab.Navigator initialRouteName={"Gorayev"}
                   screenOptions={tabNavigationOption}>
      <Tab.Screen name="Gorayev" component={GorayevListScreen} />
      <Tab.Screen name="Leukocytes"
                  component={LeukocytesListScreen}

      />
      <Tab.Screen name="Files" component={FilesScreen} />

      <Tab.Screen name="Statistic" component={EntriesScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  )
}


const $tabBar: ViewStyle = {
  backgroundColor: "white",
  height: 60,
  borderColor: "white",
  borderWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
  shadowColor: "white"
}
