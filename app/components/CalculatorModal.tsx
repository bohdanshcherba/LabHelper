import React, { useEffect, useState } from "react"
import {
  View, StyleSheet,
  TouchableOpacity, Modal, Text,
  SafeAreaView, Alert, TextInput, Dimensions
} from "react-native"

import Draggable from "react-native-draggable"
import { Icon } from "./Icon"


export const CalculatorModal = ({
                                  visible,
                                  setVisible,
                                  onConfirm = null
                                }) => {


  const [value, setValue] = useState("")
  const [equal, setEqual] = useState("")
  const buttons = [
    { title: "1", key: "1" },
    { title: "2", key: "2" },
    { title: "3", key: "3" },
    { title: "+", key: "+" },
    { title: "-", key: "-" },
    { title: "4", key: "4" },
    { title: "5", key: "5" },
    { title: "6", key: "6" },
    { title: "×", key: "*" },
    { title: "÷", key: "/" },
    { title: "7", key: "7" },
    { title: "8", key: "8" },
    { title: "9", key: "9" },
    { title: "0", key: "0" },
    { title: ".", key: "." }
  ]

  const operators = ["-", "+", "/", "*", "."]

  const onPressButton = (title, key) => {
    if (key === "-" || key === "+" || key === "/" || key === "*" || key === ".") {
      if (operators.includes(equal.slice(-1))) {
        return
      }
    }
    setValue(value + title)
    setEqual(equal + key)
  }

  const confirmBtn = () => {
    try {
      setValue(eval(equal).toString())
      setEqual(eval(equal).toString())
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <>
      <Modal animationType="slide"
             transparent={true}
             visible={visible}
             onRequestClose={() => {
               setVisible(!visible)
             }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Draggable touchableOpacityProps={{ activeOpacity: 1 }} minX={0} maxX={windowWidth}>
            <View style={s.modalView}>
              <TouchableOpacity style={s.close} onPress={() => setVisible(false)}>
                <Icon icon={"cross"} size={20} color={"black"} />
              </TouchableOpacity>


              <View style={s.buttons}>
                <TouchableOpacity style={s.btn} onPress={() => {
                  setEqual("")
                  setValue("")
                }}>
                  <Text style={s.btnText}>
                    C
                  </Text>
                </TouchableOpacity>
                <TextInput style={s.input} editable={false} value={value} />
                <TouchableOpacity onPress={confirmBtn} style={s.btn}>
                  <Text style={s.btnText}>=</Text>
                </TouchableOpacity>
                {buttons.map(el => {
                  return <TouchableOpacity key={el.title} style={s.btn} onPress={() => onPressButton(el.title, el.key)}>
                    <Text style={s.btnText}>
                      {el.title}
                    </Text>
                  </TouchableOpacity>
                })}
              </View>
            </View>
          </Draggable>
        </SafeAreaView>
      </Modal>
    </>
  )
}

const windowWidth = Dimensions.get("window").width
const btnSize = ((windowWidth - 2 - 40) / 5) - 6

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"

  },
  modalView: {
    width: windowWidth - 40+6,
    margin:15,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "black",
    shadowColor: "#000000",

    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },

  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 5,
    paddingHorizontal:3,
  },

  btn: {
    backgroundColor: "rgba(246,246,246,0.6)",

    borderRadius: 15,
    height: btnSize,
    width: btnSize,
    marginHorizontal: 3,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },

  input: {
    backgroundColor: "rgba(246,246,246,0.6)",
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 3,
    height: btnSize,
    width: (btnSize * 3) + 12,
    color: "black",
    textAlign: "right",
    fontSize: 30
  },
  close: {
    position: "absolute",
    top: -13,
    right: -13,
    backgroundColor: "#E53935",
    padding: 5,
    borderRadius: 15
  },
  btnText: {
    fontSize: 30,
    textAlign: "center",
    color: "black"
  }
})


