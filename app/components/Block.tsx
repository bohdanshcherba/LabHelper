import React, { useState } from "react"
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Item } from "../screens"


export const Block = ({ item, onPress }: { item: Item, onPress: any }) => {
  const color = item.title?.includes("Er") ? "#E53935" : "#1976D3"

  const $itemStyle = {
    backgroundColor: color,
  }

  return <TouchableOpacity onPress={onPress} style={$block}>
    <View style={[$textContainer, $itemStyle]}>
      <Text style={[$text, {color:'white'}]}>{item.title}</Text>
    </View>
    <View style={[$redBlock, { borderColor: color }]}>
      <Text style={$text}>{item.value}</Text>
    </View>
  </TouchableOpacity>
}

const $block: ViewStyle = {
  marginHorizontal: 15,
  marginVertical: 15,
}

const $textContainer: ViewStyle = {
  width: "100%",
  height: 50,
  alignItems: "center",
  justifyContent: "center",

  borderTopLeftRadius: 8,
  borderTopRightRadius: 8
}

const $text: TextStyle = {
  fontSize: 20,
  color: "black",
}

const $redBlock: ViewStyle = {
  height: 50,
  width: 150,
  borderWidth: 1,
  borderTopWidth: 0,
  alignItems: "center",
  justifyContent: "center",
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8
}
