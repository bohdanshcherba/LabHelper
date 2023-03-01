import React, { useCallback, useEffect, useState } from "react"
import { Dimensions, StyleSheet, Text, View, ViewStyle } from "react-native"
import { Calendar, CalendarList, Agenda } from "react-native-calendars"
import * as module from "module"
import { ukrainianMonth } from "../utils/dateFormat"
import { colors } from "../theme"
import { debounce } from "lodash"
import { logProfileData } from "react-native-calendars/src/Profiler"
import { BottomSheetComp } from "../components/BottomSheet"

import { GestureHandlerRootView } from "react-native-gesture-handler"


const dayComponentStyle = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "300",
    color: "black"

  }
})

const DayComponent = (props) => {

  const { date, state } = props


  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: state === "selected" ? "red" : null,
      height: 50,
      width: 40,
      margin: 0

    }}>
      <Text style={[dayComponentStyle.text, state === "disabled" ? { color: "gray" } : null]}>
        {date.day}
      </Text>
    </View>
  )
}
const date = new Date()

export const CalendarScreen = ({ navigation }) => {


  const days = [
    "ПН",
    "ВТ",
    "СР",
    "ЧТ",
    "ПТ",
    "СБ",
    "НД"
  ]


  return (
    <View style={$container}>
      <View style={s.header}>
        {days.map(d => <View key={d} style={s.day_week}>
          <Text style={s.header_day_text}>
            {d}
          </Text>
        </View>)}
      </View>
      <View style={s.calendarWrap}>

        <Calendar

          hideExtraDays={true}
          hideDayNames={true}
          renderHeader={() => null}

          theme={{

            // @ts-ignore
            "stylesheet.day.basic": {
              base: {
                height: 55,
                width: 50,
                alignItems: "center"

              },
              text: {
                marginTop: 10,
                fontSize: 22,
                fontWeight: "300",
                color: "black"
              },
              alignedText: {
                marginTop: 20
              }
            }
          }}
          markingType={"custom"}
          markedDates={{

            "2023-02-28": {
              customStyles: {
                container: {
                  backgroundColor: colors.palette.secondary100
                },
                text: {}
              }
            },
            "2023-02-27": {
              customStyles: {
                container: {
                  backgroundColor: colors.palette.secondary100
                },
                text: {}
              }
            }
          }}
        />

      </View>
      <GestureHandlerRootView style={{
        width: "100%",
        height: "50%",

        bottom: 0
      }}>
        <BottomSheetComp />

      </GestureHandlerRootView>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"
}
const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const s = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingTop: 20,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  header_month: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 0,
    flexDirection: "row"
  },
  day_week: {
    width: 52,
    alignItems: "center"
  },
  header_day_text: {
    fontSize: 18,
    fontWeight: "300",
    color: "black"
  },

  header_text: {
    fontSize: 22,
    fontWeight: "300",
    color: "black"

  },

  calendarWrap:{
    width:'100%'
  }

})
