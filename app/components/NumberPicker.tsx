import React, { FC, useState } from "react"
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native"
import { Icon } from "./Icon"

interface Props {
  onPressPlus?: () => void;
  onPressReset?: () => void;
  calculator?: boolean
}

export const NumberPicker = ({ text, value, increment, decrement, setValue }) => {

  return <View style={s.container}>
    <Text style={s.placeholder}>{text}</Text>
    <View style={s.innerContainer}>
      <TouchableOpacity
                        onPress={decrement}>
        <Icon icon={"caret_back"} size={32} color="black"  />
      </TouchableOpacity>
      <TextInput keyboardType="numeric"
                 value={value.toString()}
                 style={s.input}
                 onChangeText={e => setValue(e === "" ? "" : parseInt(e))} />
      <TouchableOpacity style={{marginRight:10}}
                        onPress={increment}>
        <Icon icon={"caret_forward"} size={32} color="black"  />

      </TouchableOpacity>
    </View>
  </View>

}


const s = StyleSheet.create({
  container: {

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 30,
    marginTop:5,

  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  placeholder: {
    fontSize: 25,
    color: "black"
  },
  input: {
    color: "black",
    fontWeight: "400",
    fontSize: 38,

    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    paddingVertical:0,
    paddingHorizontal:2,
    margin:0
  }
})

