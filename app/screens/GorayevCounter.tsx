import React, { useEffect, useState } from "react"
import {
  BackHandler,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle

} from "react-native"
import { ConfirmModal, Icon } from "../components"
import Sound from "react-native-sound"
import { useAppDispatch } from "../store/store"
import { loadGorayevItems, updateGorayevItem } from "../store/GorayevItems/action"
import { Item } from "../common/types/Item.type"
import { CalculatorModal } from "../components/CalculatorModal"


const sound = require("../../assets/zvuk41.mp3")


const ding = new Sound(sound)
const ding2 = new Sound(sound)
Sound.setCategory("Playback", true)
Sound.setMode("SpokenAudio")

export const GorayevCounterScreen = ({ navigation, route }) => {
  const { item } = route.params

  const [value, setValue] = useState(item.value)
  const [isEdit, setIsEdit] = useState(false)
  const [modal, setModal] = useState(false)
  const [calculatorVisible, setCalculatorVisible] = useState(false)

  useEffect(() => {
    ding.setSpeed(0.80)
    ding2.setSpeed(0.80)
    ding.stop()
    ding2.stop()
  }, [])

  const dispatch = useAppDispatch()

  const saveItem = () => {
    const newItem: Item = {
      key: item.key,
      title: item.title,
      type: item.type,
      value: value
    }

    dispatch(updateGorayevItem(newItem))
  }

  const closeModal = () => {
    saveItem()
    navigation.goBack(null)
  }

  useEffect(() => {
    // @ts-ignore
    BackHandler.addEventListener("hardwareBackPress", saveItem)

    // @ts-ignore
    return () => BackHandler.removeEventListener("hardwareBackPress", saveItem)
  }, [value])

  const increment = () => {
    if (value % 2 === 0) {
      ding.play()
    } else {
      ding2.play()
    }

    setValue(value + 1)

  }

  const multiply = () => {


    setValue(value *5)

  }


  return (
    <View style={$container}>
      <ConfirmModal visible={modal} setVisible={setModal} onConfirm={() => setValue(0)} />
      <CalculatorModal visible={calculatorVisible} setVisible={setCalculatorVisible} />
      <View style={$header}>
        <TouchableOpacity style={$cross} onPress={closeModal}>
          <Icon icon={"cross"} size={35} />
        </TouchableOpacity>
        <View>
          {isEdit ? <View>
              <TextInput value={value === 0 ? "" : value.toString()}
                         style={$editValue}
                         onChangeText={(text) => setValue(Number(text))}
                         keyboardType={"numeric"}
                         maxLength={5}
                         onSubmitEditing={() => setIsEdit(false)}
              />
            </View>
            :
            <Text style={{ color: "black", fontSize: 18, fontWeight: "300" }}>{item.title}</Text>
          }
        </View>

        <View style={{ flexDirection: "row" }}>
          {isEdit ?
            <Icon icon={"check"} size={39}
                  style={{ marginRight: 15 }}
                  onPress={() => setIsEdit(false)} /> :
            <Icon icon={"pencil"} size={35}
                  style={{ marginRight: 15 }}
                  onPress={() => setIsEdit(true)} />
          }
          <Icon icon={"reset"}
                size={35}
                style={{ marginRight: 15 }}
                onPress={() => setModal(true)}
          />
          <Icon icon={"calculator"} size={35} onPress={() => setCalculatorVisible(true)} />
        </View>
      </View>
      <TouchableOpacity style={$btnMultiply} onPress={multiply}>
        <Text style={{ color: "black" }}>x 5</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={increment} disabled={isEdit}>
        <View style={$counterContainer}>
          <Text style={$ModalText}>{value}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
const $btnMultiply: ViewStyle = {
  position: "absolute",
  top: 70,
  right: 20,
  borderColor: "black",
  borderWidth: 1,
  borderRadius: 5,
  zIndex: 10,
  width: 35,
  height:35,
  alignItems:'center',
  justifyContent:'center'
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
const $editValue: TextStyle = {
  color: "black",
  backgroundColor: "#ffffff",
  borderColor: "black",
  borderBottomWidth: 1,
  paddingHorizontal: 50,
  height: "100%",
  padding: 0,
  fontSize: 20,
  textAlign: "auto"
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
  fontSize: 150,
  color: "black"
}

const $cross: ViewStyle = {}
