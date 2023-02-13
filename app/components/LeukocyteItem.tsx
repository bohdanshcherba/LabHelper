import React from "react"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"


export const LeukocytesItem = ({ typeImage, value }: { typeImage: LeukocyteName, value: number }) => {


  return <View style={s.item}>
    <View style={s.counter}>
      <Text style={s.counterText}>{value}</Text>
    </View>
    <Image source={imagesRegistry[typeImage]} style={s.itemImage} />
  </View>

}

const windowWidth = Dimensions.get("window").width
const blockWidth = (windowWidth / 2) - 15
const s = StyleSheet.create({
  item: {
    width: (blockWidth / 3) - 5 * 3,
    height: (blockWidth / 3) - 5 * 3,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 150
  },
  itemImage: {
    width: (blockWidth / 3) - 5 * 3,
    height: (blockWidth / 3) - 5 * 3
  },
  counter: {
    position: "absolute",
    right: 0,
    width: 12,
    height: 16,
    backgroundColor:  "rgba(122,28,188,1)",
    zIndex: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },
  counterText: {
    color: "white",
    fontSize: 10
  }
})

export type LeukocyteName = keyof typeof imagesRegistry

const imagesRegistry = {
  lymphocyte: require("../../assets/images/Untitled116.png"),
  basophil: require("../../assets/images/Untitled117.png"),
  monocyte: require("../../assets/images/Untitled118.png"),
  eosinophil: require("../../assets/images/Untitled119.png"),
  mature: require("../../assets/images/Untitled120.png"),
  banded: require("../../assets/images/Untitled123.png"),
  platelet: require("../../assets/images/Untitled124.png")
}
