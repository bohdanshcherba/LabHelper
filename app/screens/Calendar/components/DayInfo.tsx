import React from "react"
import { View, ViewStyle, Text, TouchableOpacity, TextStyle, Dimensions } from "react-native"

import { useAppDispatch, useAppSelector } from "../../../store/store"
import { setIsMarkingMode, setMarkColor } from "../../../store/Calendar/action"
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
        <Text style={{color:'black', fontSize:20,}}> {selectedDay?.dayInfo ? selectedDay.dayInfo.total +'₴' : 'Немає інформації' } </Text>
      </View>


    </View>
  )
}

//export const MemoColorPicker = React.memo(ColorPicker)



const $container: ViewStyle = {
  width: "100%",
  alignItems: "center"
}


const $mode: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingHorizontal: 20,
  paddingVertical: 5

}
