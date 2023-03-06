import React, { useCallback, useEffect, useRef, useState } from "react"
import { Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native"


import { colors } from "../../../theme"
import { getMonths, ukrainianMonth, ukrainianMonthYear } from "../../../utils/dateFormat"
import { CalendarDays } from "./CalendarDays"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  interpolate, runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from "react-native-reanimated"


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

const months = getMonths()
console.log(months.length)
const Months = ({ months, markedDays,resize }) => {
  return <>{months.map(days =>
    <CalendarDays key={Math.random()} days={days} markedDays={markedDays} resize={resize} />)}
  </>
}

const MemorizedMonths = React.memo(Months)

export const Timetable = ({resize}) => {
  const [visibleMonthIndex, setVisibleMonthIndex] = useState(3)

  const [markedDays, setMarkedDays] = React.useState([
    new Date(2023, 2, 1) // March 3, 2023

  ])
  const sharedX = useSharedValue(0)
  const context = useSharedValue({ x: 0 })
  const index = useSharedValue(0)

  const scrollTo = useCallback((destination: number) => {
    "worklet"
    sharedX.value = withSpring(destination, { damping: 50 })
  }, [])

  const gesture = Gesture.Pan()
    .onStart(event => {
      context.value = { x: sharedX.value }
    })
    .onChange(event => {
      sharedX.value = event.translationX + context.value.x


    })
    .onEnd(() => {

      if (context.value.x >= sharedX.value && sharedX.value > -windowWidth * ((months.length / 2) - 1)) {
        //right
        index.value = (index.value + 1)
        runOnJS(setVisibleMonthIndex)(visibleMonthIndex + 1)
        scrollTo(-windowWidth * index.value)
      } else {
        scrollTo(-windowWidth * index.value)
      }
      if (context.value.x <= sharedX.value && sharedX.value < windowWidth * ((months.length / 2) - 1)) {
        //left
        index.value = (index.value - 1)
        runOnJS(setVisibleMonthIndex)(visibleMonthIndex - 1)
        scrollTo(-windowWidth * index.value)
      } else {
        scrollTo(-windowWidth * index.value)
      }
    })

  useEffect(() => {
    scrollTo(0)
    index.value = 0
  }, [])

  const CalendarStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: sharedX.value }] }
  })

  return (
    <View style={s.container}>
      <View style={s.header}>

        <View style={s.header_month}>
          <Text style={s.header_text}>
            {ukrainianMonthYear(months[visibleMonthIndex][10])}
          </Text>
        </View>

        <View style={s.weekDays}>
          {daysNames.map(d => <View key={d} style={s.day_week}>
            <Text style={s.header_day_text}>
              {d}
            </Text>
          </View>)}
        </View>

      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ flexDirection: "row" }, CalendarStyle]}>
          <MemorizedMonths months={months} markedDays={markedDays} resize={resize} />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}


const s = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    alignItems: "center"
  },

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

  header: {
    width: "100%",

    paddingTop: 20
  },

  header_month: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 10
  },
  header_text: {
    fontSize: 22,
    fontWeight: "300",
    color: "black"

  },

  weekDays: {
    flexDirection: "row"
  },

  day_week: {

    height: 25,
    margin: 5,

    width: windowWidth / 7 - 10,
    alignItems: "center"
  },
  header_day_text: {
    fontSize: 18,
    fontWeight: "300",
    color: "black"
  }


})
