import React, { useEffect, useMemo, useState } from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, {
  interpolate, runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from "react-native-reanimated"
import { month } from "react-native-calendars/src/dateutils"
import { useAppDispatch } from "../../../store/store"
import { isMarkDay, markDay } from "../../../store/Calendar/action"
import { ukrainianMonthYear } from "../../../utils/dateFormat"


const windowWidth = Dimensions.get("window").width

export const Day = ({ date  }) => {
  console.log(date)
  const dispatch = useAppDispatch()

  const [selected, setSelected] = useState(false)

  useEffect( ()=>{
    const getSelected = async ()=>{
      return dispatch(isMarkDay(date.dateString))
    }
    getSelected().then(res=>{
      setSelected(res.payload)
    })


  },[])

  const background = selected ? "red" : "white"

  const onPressHandle = () => {
    setSelected(!selected)
    dispatch(markDay(date.dateString))
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPressHandle}

      style={[s.day, { backgroundColor: background }]}>
      <Text style={s.day_text}>{ date.day}</Text>
    </TouchableOpacity>
  )
}


const Week = ({ daysAtWeek,  }) => {

  return <View style={{
    flexDirection: "row",
    height: 60,
    width: windowWidth - 10,
    borderColor: 'rgba(147,147,147,0.18)',
    borderTopWidth: 1
  }}>
    {daysAtWeek.map(day => <MemoDay key={Math.random()} date={day}
                                     />)}
  </View>
}

const MemoWeek = React.memo(Week)

export const Month = ({ daysAtMonth }) => {

  const subarrays: Array<any> = []
  for (let i = 0; i < daysAtMonth.length; i += 7) {
    subarrays.push(daysAtMonth.slice(i, i + 7))
  }

  return (
    <View style={{ justifyContent: "center", marginTop: 10 }}>
      <Text style={s.header_text}> {ukrainianMonthYear(daysAtMonth[10])}</Text>
      {subarrays.map(days => <MemoWeek key={Math.random()}
                                   daysAtWeek={days}


      />)}
    </View>
  )
}
const MemoDay = React.memo(Day)
const s = StyleSheet.create({

  day: {
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 8,

    width: (windowWidth - 10) / 7 - 4,
    alignItems: "center",
    height:'100%'
  },
  header_text: {
    fontSize: 18,
    fontWeight: "300",
    color: "black"

  },
  day_text: {
    fontSize: 18,
    fontWeight: "300",
    color: "black"
  }


})
