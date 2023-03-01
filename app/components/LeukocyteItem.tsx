import React, { useEffect, useState } from "react"
import { Dimensions, Image, ImageStyle, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon } from "./Icon"
import { colors } from "../theme"


const windowWidth = Dimensions.get("window").width
export const LeukocytesItem = ({
                                 typeImage,
                                 value,
                                 size = "S",
                                 onPress,
                                 onLongPress,
                                 platelet = false,
                                 setPlatelet

                               }: {
  size?: "S" | "L",
  typeImage: LeukocyteName,
  value: number,
  onPress?: () => void,
  onLongPress?: () => void,
  platelet?: boolean,
  setPlatelet?: (boolean) => void
}) => {

  let itemSizeStyle: ImageStyle = {}

  if (size === "L") {
    const blockWidth = windowWidth
    itemSizeStyle = {
      width: (blockWidth / 3) - 5 * 3,
      height: (blockWidth / 3) - 5 * 3

    }
  }

  if (typeImage === "platelet") {
    return <TouchableOpacity style={[s.item, itemSizeStyle]}
                             disabled={size === "S"}
                             onPress={onPress}
                             onLongPress={onLongPress}
                             activeOpacity={1}
    >
      {!platelet ?
        <View style={[s.counter, size === "L" ? { minWidth: 30, height: 45 } : null]}>
          <Text style={[s.counterText, size === "L" ? { fontSize: 20 } : null]}>{value}</Text>
        </View> : null
      }
      <View style={{ zIndex: 5 }}>
        {platelet ? <TouchableOpacity activeOpacity={1}
                                      onLongPress={() => setPlatelet(false)}
                                      style={s.platelet_cross}>
          <Image source={require("../../assets/images/cancel.png")} style={s.cross_img} />
        </TouchableOpacity> : null
        }
        {!platelet && size === "L" ? <TouchableOpacity style={s.platelet_btn}
                                                       onPress={() => setPlatelet(true)}
                                                       activeOpacity={1}
        >
          <Icon icon={"cross_field"} size={15} color={"white"} />
        </TouchableOpacity> : null}
        <Image source={imagesRegistry[typeImage]} style={[s.itemImage, itemSizeStyle]} />
      </View>
    </TouchableOpacity>
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
  cross_img: {
    width: "80%",
    height: "80%"
  },
  platelet_cross: {

    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",

    zIndex: 5
  },
  platelet_btn: {
    left: 2,
    position: "absolute",
    minWidth: 30,
    height: 45,
    borderRadius: 12,
    backgroundColor: colors.palette.secondary100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10
  },
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
    zIndex: 1
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
