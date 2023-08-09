import React, { useEffect, useState } from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native"

import { useAppDispatch, useAppSelector } from "../../../store/store"
import { getMarkColor, getMarkingMode, isMarkDay, markDay, setSelectedDay } from "../../../store/Calendar/action"
import {  compareColor } from "../../../theme"

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
      backgroundColor: 'rgba(0,0,0,0.25)',
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
