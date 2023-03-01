import React, { useEffect, useState } from "react"
import { View, StyleSheet, TouchableOpacity, Modal, Text, SafeAreaView} from "react-native"


export const CountModal = ({ visible, setVisible,
                             title,
                             onConfirm,
                             currentValue=10}) => {

  const [count, setCount] = useState(currentValue)

  useEffect(()=>{
    setCount(currentValue)
  },[currentValue])

  return (
    <>
      <Modal animationType="slide"
             transparent={true}
             visible={visible}
             onRequestClose={() => {
               setVisible(!visible)
             }}
      >
        <SafeAreaView style={{ flex: 1 }} >
          <View style={s.centeredView}>
            <View style={s.modalView}>
              <View style={s.modalTextContainer}>
                <Text style={s.modalText}>{title}</Text>
                <View style={s.counter}>
                  <TouchableOpacity style={s.btnCount} onPress={() => setCount(count - 1)}>
                    <Text style={s.btnCountText}>-</Text>
                  </TouchableOpacity>
                  <Text style={s.counterText}>{count.toString()}</Text>
                  <TouchableOpacity onPress={() => setCount(count + 1)} style={s.btnCount}>
                    <Text style={s.btnCountText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={s.innerContainer}>
                <TouchableOpacity style={s.modalBtn} onPress={() => setVisible(false)}>
                  <Text style={s.modalBtnText}>Відміна</Text>
                </TouchableOpacity>
                <Text style={{ color: "rgba(0,0,0,0.59)", fontSize: 24 }}>|</Text>
                <TouchableOpacity style={s.modalBtn} onPress={() => onConfirm(count)}>
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

const s = StyleSheet.create({
  btnCount: {
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  btnCountText: {
    fontSize: 30,
    color: "black"
  },
  counter: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5

  },
  counterText: {
    fontSize: 30,
    color: "black",
    marginHorizontal: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center"
  },
  modalView: {
    width: "70%",
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
    marginBottom: 10,
    zIndex:10,
  },
  modalText: {
    color: "black",
    textAlign: "center",
    fontSize: 16
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 30,
    marginVertical: 15
  },
  modalBtn: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center"
  },
  modalBtnText: {
    color: "black",
    textAlign: "center",
    fontSize: 20
  }
})


