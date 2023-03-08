import React, { useCallback, useEffect, useRef, useState } from "react"
import { Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native"


import { colors } from "../../../theme"
import { getMonths, ukrainianMonth, ukrainianMonthYear } from "../../../utils/dateFormat"
import { Day, Month } from "./CalendarDays"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  interpolate, runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from "react-native-reanimated"
import { FlashList } from "@shopify/flash-list"
import { CalendarList, LocaleConfig } from "react-native-calendars"


const daysNames = [
  "ПН",
  "ВТ",
  "СР",
  "ЧТ",
  "ПТ",
  "СБ",
  "НД"
]
LocaleConfig.locales.uk = {
  monthNames: [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
  ],
  monthNamesShort: [
    'Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер',
    'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру',
  ],
  dayNames: [
    'Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота',
  ],
  dayNamesShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сьогодні',
}
LocaleConfig.defaultLocale = "uk"
const windowWidth = Dimensions.get("window").width - 10

const months = getMonths(12)
const oneMonth = months[0]
export const Timetable = ({ resize }) => {
  const [visibleMonths, setVisibleMonths] = useState(months)


  const sharedX = useSharedValue(0)
  const context = useSharedValue({ x: 0 })
  const index = useSharedValue(0)

  const scrollTo = useCallback((destination: number) => {
    "worklet"
    sharedX.value = withSpring(destination, { damping: 50 })
  }, [])


  const rightMonth = () => {
    const copy = [...visibleMonths]

    copy.push(oneMonth)
    copy.shift()
    setVisibleMonths(copy)

  }

  const leftMonth = () => {
    const copy = [...visibleMonths]
    copy.unshift(oneMonth)
    copy.pop()
    setVisibleMonths(copy)

  }


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
        //runOnJS(setVisibleMonthIndex)(visibleMonthIndex + 1)
        //runOnJS(rightMonth)()
        scrollTo(-windowWidth * index.value)

      } else {
        scrollTo(-windowWidth * index.value)
      }
      if (context.value.x <= sharedX.value && sharedX.value < windowWidth * ((months.length / 2) - 1)) {
        //left
        index.value = (index.value - 1)
        //runOnJS(setVisibleMonthIndex)(visibleMonthIndex - 1)
        // runOnJS(leftMonth)()
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
            2023
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
      <View>
        <CalendarList
          horizontal={true}
          firstDay={1}
          pagingEnabled
          dayComponent={({ date }) => <Day date={date} />}
          renderHeader={(date)=>
            <View style={s.header}>
              <Text style={s.header_month_text}> {ukrainianMonthYear(new Date(date))}</Text>
            </View>
          }

          theme={{
            arrowColor: "white",
            // @ts-ignore
            "stylesheet.calendar.header": {
              week: {
                display: "none"
              }
            },
            "stylesheet.calendar.main": {
              week: {

                flexDirection: "row",
                justifyContent: "space-around",
                borderColor: "rgba(147,147,147,0.18)",
                borderTopWidth: 1,
                height: 60
              }
            }
          }}
        />
      </View>

      {/*<GestureDetector gesture={gesture}>*/}
      {/*  <Animated.View style={[{flexDirection:'row'}, CalendarStyle]}>*/}
      {/*    {visibleMonths.map(month=><Month key={Math.random()} daysAtMonth={month}/>)}*/}
      {/*  </Animated.View>*/}
      {/*</GestureDetector>*/}
      {/*<View style={{width:'100%', justifyContent:'center'}}>*/}


      {/*<FlashList horizontal*/}
      {/*           initialScrollIndex={4}*/}
      {/*           pagingEnabled*/}
      {/*           estimatedItemSize={200} data={months} renderItem={({ item }) => <Month daysAtMonth={item}/> }  />*/}
      {/*</View>*/}
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

    width: (windowWidth) / 7 - 10,
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
    paddingBottom: 5
  },
  header_text: {
    fontSize: 22,
    fontWeight: "300",
    color: "black"

  },
  header_month_text: {
    fontSize: 16,
    fontWeight: "300",
    color: "black"
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "center"
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
