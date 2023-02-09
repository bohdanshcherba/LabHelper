import React, { useState } from "react"
import { Text, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { Icon } from "../components"
import Sound from "react-native-sound"


const sound = require("../../assets/zvuk41.mp3")

const ding = new Sound(sound)

export const GorayevCounterScreen = ({ navigation, route }) => {
  Sound.setCategory("Playback")
  ding.setVolume(1)
  ding.setSpeed(0.8)

  const [value, setValue] = useState(0)

  const closeModal = () => {
    navigation.goBack(null)
  }

  const increment = () => {
    setValue(value + 1)
    ding.play()
  }

  return (
    <View style={$container}>
      <View style={$header}>
        <TouchableOpacity style={$cross} onPress={closeModal}>
          <Icon icon={"cross"} size={28} />
        </TouchableOpacity>
        <Text style={{ color: "black", fontSize: 18, fontWeight: "300" }}>Le4</Text>
        <View style={{ flexDirection: "row" }}>
          <Icon icon={"pencil"} size={28} style={{ marginRight: 15 }} />
          <Icon icon={"reset"} size={28} style={{ marginRight: 15 }} />
          <Icon icon={"calculator"} size={28} />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={increment}>
        <View style={$counterContainer}>
          <Text style={$ModalText}>{value}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const $header: ViewStyle = {
  position: "absolute",
  width: "100%",
  backgroundColor: "#ffffff",
  paddingTop: 20,
  paddingBottom: 10,
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
  flexDirection: "row",
  zIndex: 10

}
const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "#ffffff"
}

const $counterContainer: ViewStyle = {
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white"

}

const $ModalText: TextStyle = {
  fontSize: 40,
  color: "black"
}

const $cross: ViewStyle = {}
