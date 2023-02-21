import React, { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Modal, Animated, SafeAreaView } from "react-native"


export const PopupColorPicker = ({ visible, setVisible, pickColor }) => {

  const options = [
    { color: "#E53935" },
    { color: "#F5B0AE" },
    { color: "#C59E1C" },
    { color: "#E8D8A4" },
    { color: "#1CD37F" },
    { color: "#A4EDCC" },
    { color: "#1976D3" },
    { color: "#A3C8ED" },
    { color: "#7A1CBC" },
    { color: "#CAA4E4" },
    { color: "#B01E80" },
    { color: "#DFA5CC" },
  ]

  const [slideAnim] = useState(new Animated.Value(-300)) // starting position off-screen

  useEffect(() => {
    if (visible) {
      // slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    } else {
      // slide out
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
          // reset position when animation completes
          slideAnim.setValue(-300)
        }

      )
    }
  }, [visible, slideAnim])

  return (
    <>
      <Modal transparent visible={visible} animationType={"slide"} >
        <SafeAreaView style={{ flex: 1 }} onTouchEnd={() => setVisible(false)}>
          <Animated.View style={[s.popup, { transform: [{ translateY: slideAnim }]}] }>
            {options.map((el, i) => {
              return <TouchableOpacity
                onPress={() => {
                  pickColor(el.color)

                }}
                key={el.color}
                style={[s.item, { backgroundColor: el.color }]}>
              </TouchableOpacity>
            })}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>

  )
}

const s = StyleSheet.create({

  popup: {
    position: "absolute",
    top: 60,
    right: 30,
    backgroundColor: "#ffffff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    width: 162,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  item: {
    width: 30,
    height: 30,
    borderRadius: 20,
    margin: 5
  }

})
