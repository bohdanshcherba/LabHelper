import React, { useCallback, useEffect, useRef, useState } from "react"
import { Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native"


import { colors } from "../../../theme"
import { ukrainianMonth } from "../../../utils/dateFormat"
import { CalendarDays } from "./CalendarDays"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"


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

export const Timetable = () => {


  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [visibleMonthIndex, setVisibleMonthIndex] = useState(2)


  const changeDate = (num) => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + num, 1)

  }

  const getDaysInMonth = (month) => {

    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 0)
    const startingDayOfWeek = firstDayOfMonth.getDay() // Sunday = 0, Monday = 1, etc.
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const days: Array<any> = []

    // add empty cells for days before the start of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // add days for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), i))
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)

  const months = [days]

  for (let i = 1; i < 3; i++) {
    months.push(getDaysInMonth(changeDate(i)))
    months.unshift(getDaysInMonth(changeDate(-i)))
  }


  const [markedDays, setMarkedDays] = React.useState([
    new Date(2023, 2, 1), // March 3, 2023
    new Date(2023, 3, 10), // March 10, 2023
    new Date(2023, 4, 17) // March 17, 2023
  ])

  const onViewableItemsChanged = ({
                                    viewableItems
                                  }) => {
    console.log(viewableItems[0].index)

  }
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged }
  ])


  return (
    <View style={s.container}>
      <View style={s.header}>

        <View style={s.header_month}>
          <Text style={s.header_text}>{visibleMonthIndex}</Text>
        </View>

        <View style={s.weekDays}>
          {daysNames.map(d => <View key={d} style={s.day_week}>
            <Text style={s.header_day_text}>
              {d}
            </Text>
          </View>)}
        </View>

      </View>

      <FlatList data={months}
                horizontal
                pagingEnabled
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={false}
                initialScrollIndex ={2}
                renderItem={item =>
                  <CalendarDays days={item.item} markedDays={markedDays} />}
        // @ts-ignore
                viewabilityConfigCallbackPairs={
                  viewabilityConfigCallbackPairs.current
                }
      />

      {/*<Animated.View style={[{flexDirection:'row'}, CalendarStyle]}>*/}

      {/*    <CalendarDays days={getDaysInMonth(changeDate(-1))} markedDays={markedDays}/>*/}

      {/*    <CalendarDays days={days} markedDays={markedDays}/>*/}

      {/*    <CalendarDays days={getDaysInMonth(changeDate(1))} markedDays={markedDays}/>*/}


      {/*</Animated.View>*/}

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
