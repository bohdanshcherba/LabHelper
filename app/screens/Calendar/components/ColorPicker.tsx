import React from "react"
import { View, ViewStyle, Text, TouchableOpacity, TextStyle, Dimensions } from "react-native"

import { useAppDispatch, useAppSelector } from "../../../store/store"
import { saveMarkedDays, setIsMarkingMode, setMarkColor } from "../../../store/Calendar/action"
import { Icon } from "../../../components"
import { colors } from "../../../theme"


const Item = ({ color, name, focused, onPress }) => {
  return <TouchableOpacity
    activeOpacity={1}
    onPress={onPress}
    style={[$item, {
      backgroundColor: color,
      transform: [{ translateY: focused ? -10 : 0 }]
    }]}>
    <Text style={$itemText}>{name[0]}</Text>
  </TouchableOpacity>
}

export const ColorPicker = () => {
  const dispatch = useAppDispatch()

  const selected = useAppSelector(state => state.CalendarReducer.markingColor)

  const items = [

    { name: "", color: colors.palette.color1 },
    { name: "", color: colors.palette.color2 },
    { name: "", color: colors.palette.color3 },
    { name: "", color: colors.palette.color4 },
    { name: "", color: colors.palette.color5 },
    { name: "", color: colors.palette.color6 },
    { name: "", color: colors.palette.color7 },
    { name: "", color: colors.palette.color8 },
    { name: "", color: colors.palette.color9 },
    { name: "", color: colors.palette.color10 },
    { name: "", color: colors.palette.color11 },
    { name: "", color: colors.palette.color12 }
  ]

  const changeColor = (item) => {
    dispatch(setMarkColor(item))
  }

  const changeMode = () => {
    dispatch(setIsMarkingMode(false))
    dispatch(saveMarkedDays([]))
  }


  return (
    <View style={$contain}>
      <View style={$mode}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>changeColor({ name: "", color: "#fff" })}
          style={[$itemClear, {
            transform: [{ translateX: selected.color === "#fff" ? 0 : 0 }]
          }]}>
          <Icon icon={"trash"} size={28} color={selected.color === "#fff" ? "#E53935" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={changeMode}>
          <Icon icon={"check"} size={30} />
        </TouchableOpacity>
      </View>
      <View style={$container}>

        {items.map(i =>
          <Item key={i.color}
                color={i.color}
                name={i.name}
                focused={i.color === selected.color}
                onPress={() => changeColor(i)}
          />)
        }
      </View>


    </View>
  )
}

//export const MemoColorPicker = React.memo(ColorPicker)
const windowWidth = Dimensions.get("window").width - 10
const $contain: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center"
}
const $mode: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 5

}
const $container: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center"
}

const itemSize = (windowWidth / 12 * 2) - 20

const $item: ViewStyle = {
  marginHorizontal: 10,
  marginVertical: 10,
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "#7A1CBC",
  width: itemSize,
  height: itemSize
}
const $itemText: TextStyle = {
  color: "white", fontSize: 18
}

const $itemClear: ViewStyle = {

  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center"
  //borderWidth: 1,
  //borderColor: "#7A1CBC",

}
