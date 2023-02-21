import React, { useEffect, useState } from "react"
import { Dimensions, Image, ImageStyle, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"


const windowWidth = Dimensions.get("window").width
export const LeukocytesItem = ({ typeImage, value, size = "S", onPress, onLongPress }: {
  size?: "S" | "L",
  typeImage: LeukocyteName,
  value: number,
  onPress?: () => void,
  onLongPress?: () => void,
}) => {

  let itemSizeStyle: ImageStyle = {}

  if (size === "L") {
    const blockWidth = windowWidth
    itemSizeStyle = {
      width: (blockWidth / 3) - 5 * 3,
      height: (blockWidth / 3) - 5 * 3

    }
  }

  return <TouchableOpacity style={[s.item, itemSizeStyle]}
                           disabled={size === "S"}
                           onPress={onPress}
                           onLongPress={onLongPress}
                           activeOpacity={1}
  >
    <View style={[s.counter, size === "L" ? { minWidth: 30, height: 45 } : null]}>
      <Text style={[s.counterText, size === "L" ? { fontSize: 20 } : null]}>{value}</Text>
    </View>
    <Image source={imagesRegistry[typeImage]} style={[s.itemImage, itemSizeStyle]} />
  </TouchableOpacity>

}


const blockWidth = (windowWidth / 2) - 15
const s = StyleSheet.create({
  counter: {
    alignItems: "center",
    backgroundColor: "rgba(122,28,188,1)",
    borderRadius: 12,
    flex: 1,
    height: 16,
    justifyContent: "center",
    minWidth: 12,
    position: "absolute",
    right: 0,
    zIndex: 10
  },
  counterText: {
    color: "white",
    fontSize: 10
  },
  item: {
    borderRadius: 150,
    height: (blockWidth / 3) - 5 * 3,
    marginHorizontal: 5,
    marginVertical: 5,
    width: (blockWidth / 3) - 5 * 3
  },
  itemImage: {
    height: (blockWidth / 3) - 5 * 3,
    width: (blockWidth / 3) - 5 * 3
  }
})

export type LeukocyteName = keyof typeof imagesRegistry

const imagesRegistry = {
  lymphocyte: require("../../assets/images/lymphocyte.png"),
  basophil: require("../../assets/images/Untitled117.png"),
  monocyte: require("../../assets/images/monocyte.png"),
  eosinophil: require("../../assets/images/eosinophil.png"),
  mature: require("../../assets/images/mature.png"),
  banded: require("../../assets/images/banded.png"),
  platelet: require("../../assets/images/Untitled124.png")
}
