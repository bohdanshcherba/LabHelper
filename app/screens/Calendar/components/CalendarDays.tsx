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
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { getMarkColor, getMarkingMode, isMarkDay, markDay, setSelectedDay } from "../../../store/Calendar/action"
import { ukrainianMonthYear } from "../../../utils/dateFormat"
import { colors, compareColor } from "../../../theme"


const windowWidth = Dimensions.get("window").width

export const Day = ({ date, today }) => {

  const selectedDay = useAppSelector(state => state.CalendarReducer.selectedDay)

  const isToday = selectedDay?.date === date.dateString
  const dispatch = useAppDispatch()

  const [marked, setMarked] = useState<{
    color: string,
    name: string
  } | null>(null)


  useEffect(() => {
    const getSelected = async () => {
      return dispatch(isMarkDay(date.dateString))
    }
    getSelected().then(res => {
      setMarked(res.payload)
    })
  }, [])

  const background = marked ? marked.color : "white"
  const textColor = marked ? compareColor(marked.color) : 'black'

  const onPressHandle = async () => {
    const isMarkingMode = await dispatch(getMarkingMode([]))

    if (isMarkingMode.payload) {
      const markColor = await dispatch(getMarkColor([]))
      if (marked?.color === markColor.payload.color
        || markColor.payload.color === "#fff") {
        setMarked(null)
        dispatch(markDay({ date: date.dateString, markColor: null }))
      } else {
        setMarked(markColor.payload)
        dispatch(markDay({ date: date.dateString, markColor: markColor.payload }))
      }

    } else {
      dispatch(setSelectedDay(date.dateString))
    }
  }

  const todayStyle = today.getTime() === new Date(date.dateString).getTime() ?
    {
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.68)',
      paddingHorizontal:4,
      paddingVertical:2,
      borderRadius: 20,
    } : null

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPressHandle}

      style={[s.day,
        { backgroundColor: background },
        isToday ? { borderWidth: 1 } : null]}>
      <Text style={[s.day_text,{color: textColor},
        todayStyle]}>{date.day}</Text>
    </TouchableOpacity>
  )
}


const Week = ({ daysAtWeek }) => {

  return <View style={{
    flexDirection: "row",
    height: 60,
    width: windowWidth - 10,
    borderColor: "rgba(147,147,147,0.18)",
    borderTopWidth: 1
  }}>
    {daysAtWeek.map(day => <MemoDay key={Math.random()} date={day} today={""}
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
    height: "95%"
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
