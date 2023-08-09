import React from "react"
import { View, ViewStyle, Text, TouchableOpacity, TextStyle, Dimensions, TextInput, StyleSheet } from "react-native"

import { useAppDispatch, useAppSelector } from "../../../store/store"
import { setIsMarkingMode} from "../../../store/Calendar/action"
import { Icon } from "../../../components"


export const DayInfo = () => {
  const dispatch = useAppDispatch()

  const selectedDay = useAppSelector(state => state.CalendarReducer.selectedDay)

  const changeMode = () => {
    dispatch(setIsMarkingMode(true))
  }

  return (
    <View style={$container}>
      <View style={$mode}>
        <TouchableOpacity onPress={changeMode}>
          <Icon icon={"edit"} size={30} />
        </TouchableOpacity>
      </View>
      <View>
        {selectedDay?.dayInfo ?
          <>
            <View style={$total}>

              <Text style={$value}>{selectedDay.dayInfo.total + "₴"}</Text>
            </View>

            {
              selectedDay.dayInfo.analyzes?.map((item, i) => {
                return <View style={$analyzes} key={i}>
                  <Text style={$placeholder}>{item.title}</Text>
                  <Text style={$value}>{item.value}</Text>
                </View>
              })
            }


          </> : <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={{
              fontSize: 20,
              color: "rgba(0,0,0,0.6)"
            }}>Немає інформації</Text>
          </View>}
      </View>
    </View>
  )
}

//export const MemoColorPicker = React.memo(ColorPicker)

const $analyzes: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 25
}
const $total: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
  paddingHorizontal: 25,
  marginVertical: 8
}

const $placeholder: TextStyle = {
  fontSize: 25,
  color: "black"
}
const $value: TextStyle = {
  fontSize: 25,
  color: "black"
}

const $container: ViewStyle = {
  width: "100%"
}

const $mode: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingHorizontal: 20,
  paddingVertical: 5

}
