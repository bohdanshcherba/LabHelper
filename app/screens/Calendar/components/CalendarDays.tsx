import React, { useCallback, useEffect, useState } from "react"
import { Button, Dimensions, StyleSheet, Text, View, ViewStyle } from "react-native"


import { colors } from "../../../theme"
import { ukrainianMonth } from "../../../utils/dateFormat"


const daysNames = [
  "ПН",
  "ВТ",
  "СР",
  "ЧТ",
  "ПТ",
  "СБ",
  "НД"
]

const windowWidth = Dimensions.get("window").width

export const CalendarDays = ({days, markedDays}) => {

  const isMarkedDay = (day) => {
    return markedDays.some((markedDay) => markedDay.getTime() === day.getTime())
  }

  return <View style={{ flexDirection: "row", flexWrap: "wrap", width:windowWidth }}>
        {days.map(day => {
            if (day && isMarkedDay(day)) {
              return <View key={Math.random()} style={[s.day, { backgroundColor: "red" }]}>
                <Text style={s.day_text}>{day ? day.getDate() : ""}</Text>
              </View>
            }
            return <View key={Math.random()} style={s.day}>
              <Text style={s.day_text}>{day ? day.getDate() : ""}</Text>
            </View>
          }
        )}
      </View>
}


const s = StyleSheet.create({

  day: {
    height: 50,
    margin: 5,

    width: windowWidth / 7 - 10,
    alignItems: "center"

  },

  day_text: {
    fontSize: 18,
    fontWeight: "300",
    color: "black"
  },



})
