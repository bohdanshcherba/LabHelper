import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  BackHandler
} from "react-native"
import { colors } from "../theme"
import { Icon } from "./Icon"
import { convertNumber } from "../utils/convertNumber"


export const FormulaModal = ({ visible, setVisible, children, onConfirm, innerContainerStyle={} }) => {



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
          <View style={s.centeredView}>
            <View style={s.modalView}>
              <View style={[s.innerContainer, innerContainerStyle]}>
                {children}

                <TouchableOpacity style={s.modalBtn} activeOpacity={0.8} onPress={onConfirm}>
                  <Text style={s.modalBtnText}>Зберегти</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>

  )
}
const windowWidth = Dimensions.get("window").width
const size = windowWidth / 6
const s = StyleSheet.create({
  centeredView: {
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  modalView: {
    width: "95%",
    height: 300,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    alignItems: "center"
  },
  modalTextContainer: {
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 10
  },
  modalText: {
    color: "black",
    textAlign: "center",
    fontSize: 16
  },
  innerContainer: {
    width: "100%",
    height: " 100%",
    justifyContent: "space-around",
    paddingHorizontal: size


  },
  inputsBlock: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  input: {
    borderColor: colors.palette.secondary100,
    borderWidth: 1,
    borderRadius: 12,
    width: size,
    height: size,
    color: "black",
    textAlign: "center",
    fontSize: 30

  },

  modalBtn: {
    borderWidth: 1,
    borderColor: colors.palette.secondary100,
    backgroundColor: colors.palette.secondary100,
    borderRadius: 12,

    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
    textAlign: "center"
  },
  modalBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20
  }
})


