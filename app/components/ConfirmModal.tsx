import React from "react"
import { View, StyleSheet, TouchableOpacity, Modal, Text, SafeAreaView, Alert } from "react-native"


export const ConfirmModal = ({ visible, setVisible, onConfirm }) => {

  return (
    <>
      <Modal animationType="slide"
             transparent={true}
             visible={visible}
             onRequestClose={() => {
               Alert.alert("Modal has been closed.")
               setVisible(!visible)
             }}
      >
        <SafeAreaView style={{ flex: 1 }} onTouchEnd={() => setVisible(false)}>
          <View style={s.centeredView}>
            <View style={s.modalView}>
              <View style={s.modalTextContainer}>
                <Text style={s.modalText}>Are you sure?</Text>
              </View>

              <View style={s.innerContainer}>
                <TouchableOpacity style={s.modalBtn} onPress={() => setVisible(false)}>
                  <Text style={s.modalBtnText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{ color: "rgba(0,0,0,0.59)", fontSize: 24 }}>|</Text>
                <TouchableOpacity style={s.modalBtn} onPress={() => onConfirm()}>
                  <Text style={s.modalBtnText}>Reset</Text>

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
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    alignItems: "center"
  },
  modalView: {
    width: "95%",
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
    textAlign:'center',
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


