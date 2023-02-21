import React, { useEffect, useRef, useState } from "react"
import {
  View, StyleSheet,
  TouchableOpacity, Modal, Text,
  SafeAreaView, TextInput, Dimensions, Vibration, BackHandler, PanResponder, Animated
} from "react-native"

import Draggable from "react-native-draggable"
import { Icon } from "./Icon"
import { useAppDispatch, useAppSelector } from "../store/store"
import { buttons, operators } from "../common/constants/constants"
import { loadCalculatorValue, saveCalculatorValue } from "../store/app/action"


export const CalculatorModal = ({

                                  visible,
                                  setVisible,
                                  onConfirm = null
                                }) => {
  const { calculatorValue } = useAppSelector((state) => state.DefaultAppReducer)

  const dispatch = useAppDispatch()

  const [value, setValue] = useState("")
  const [equal, setEqual] = useState("")

  useEffect(() => {
    dispatch(loadCalculatorValue([]))
  }, [])

  useEffect(() => {

    setEqual(calculatorValue)
    setValue(calculatorValue)
  }, [calculatorValue])

  const onPressButton = (title, key) => {
    if (key === "-" || key === "+" || key === "/" || key === "*" || key === ".") {
      if (operators.includes(equal.slice(-1))) {
        const newEqual = equal.slice(0, -1)
        const newValue = value.slice(0, -1)
        setEqual(newEqual + key)
        setValue(newValue + title)
        return
      }
    }
    setValue(value + title)
    setEqual(equal + key)
  }

  const confirmBtn = () => {
    try {
      let result = eval(equal).toString()

      if (result.split(".")[1]?.length > 3) {

        result = Number(result).toFixed(3)
      }
      result = result.toString()
      setValue(result)
      setEqual(result)
    } catch (e) {
      console.log(e)
    }
  }

  const onCloseCalculator = () => {
    dispatch(saveCalculatorValue(equal))
  }


  const clearLastElement = () => {
    Vibration.vibrate(100)
    const newEqual = equal.slice(0, -1)
    const newValue = value.slice(0, -1)
    setValue(newValue)
    setEqual(newEqual)
  }

  useEffect(() => {
    // @ts-ignore
    BackHandler.addEventListener("hardwareBackPress", onCloseCalculator)
    // @ts-ignore
    return () => BackHandler.removeEventListener("hardwareBackPress", onCloseCalculator)
  }, [value])


  return (
    <>
      <Modal animationType="slide"
             transparent={true}
             visible={visible}
             onRequestClose={() => {
               setVisible(!visible)
             }}>


        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={s.modalView}>
            <TouchableOpacity style={s.close} onPress={() => {
              setVisible(false)
              onCloseCalculator()
            }}>
              <Icon icon={"cross_field"} size={28} color={"black"}  />
            </TouchableOpacity>
            <View style={s.buttons}>
              <TouchableOpacity style={s.btn}
                                onLongPress={clearLastElement}
                                onPress={()=>{
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
    width: windowWidth - 40 + 6,
    margin: 15,
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
  dragItem: {
    width: "100%",
    height: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  dragRiska: {
    zIndex: 11000,
    width: 70,
    height: 70,
    backgroundColor: "rgba(103,103,103,0.53)",
    borderRadius: 120

  },

  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 5,
    paddingHorizontal: 3
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
    width: (btnSize * 3) + 11,
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
    borderRadius: 15,
    zIndex: 10
  },
  btnText: {
    fontSize: 30,
    textAlign: "center",
    color: "black"
  }
})


