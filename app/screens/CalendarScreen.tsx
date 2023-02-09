import React from "react"
import { Text, View, ViewStyle } from "react-native"


export const CalendarScreen = ({ navigation }) => {

  return (
    <View style={$container}>
      <Text>CalendarScreen</Text>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"
}
