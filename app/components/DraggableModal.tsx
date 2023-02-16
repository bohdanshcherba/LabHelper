import React, { useMemo, useState } from "react"
import { Text, Animated, PanResponder, View, StyleSheet, TouchableWithoutFeedback, Modal } from "react-native"


const DraggableComponent = (props) => {
  const { position, setPosition } = props
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          setPosition({
            x: position.x + gesture.dx,
            y: position.y + gesture.dy
          })
        }
      }),
    [position]
  )

  return (
    <View{...panResponder.panHandlers}>
      <View style={[
        styles.container,
        { transform: [{ translateX: position.x }, { translateY: position.y }] }
      ]}>
        {props.children}
      </View>
    </View>
  )
}

export const DraggableModal = (props) => {
  const { visible, setVisible } = props
  const [position, setPosition] = useState({ x: 0, y: 0 })
  return <View style={[{ display: visible ? "flex" : "none" }, styles.modal]}>
    <DraggableComponent position={position} setPosition={setPosition}>
      <Text>Hi</Text>
      {props.children}
    </DraggableComponent>
    <View style={{
      position: "absolute",
      width: 50,
      height: 50,

      backgroundColor: "blue",
      transform: [{ translateX: position.x }, { translateY: position.y }]
    }}>

    </View>
  </View>

}


const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "red"
  },
  modal: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center"
  }


})
