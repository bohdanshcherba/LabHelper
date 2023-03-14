import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { Dimensions, View, ViewStyle, Text, ScrollView, FlatList, TouchableOpacity } from "react-native"


import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue, withSpring,
  withTiming
} from "react-native-reanimated"
import { CalendarList } from "react-native-calendars"
import { Timetable } from "./components/Timetable"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { loadCalendar, setIsMarkingMode, setMarkColor } from "../../store/Calendar/action"
import { Icon } from "../../components"
import { ColorPicker } from "./components/ColorPicker"
import { DayInfo } from "./components/DayInfo"
import { loadEntries } from "../../store/Statistic/action"


const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

const maxTranslateY = -windowHeight * 75 / 100


export const CalendarScreen = ({ navigation }) => {

  const isMarking = useAppSelector(state => state.CalendarReducer.isMarkingMode)

  const dispatch = useAppDispatch()

  const sharedY = useSharedValue(0)
  const sharedX = useSharedValue(0)
  const active = useSharedValue(false)

  const scrollTo = useCallback((destination: number) => {
    "worklet"
    active.value = destination !== 0
    sharedY.value = withSpring(destination, { damping: 50 })
  }, [])

  const context = useSharedValue({ y: 0, x: 0 })


  const gesture = Gesture.Pan()
    .onStart(event => {
      context.value = { y: sharedY.value, x: sharedX.value }
    })
    .onChange(event => {
      if (!isMarking) {
        sharedY.value = event.translationY + context.value.y
        sharedY.value = Math.max(sharedY.value, maxTranslateY)
      }

    })
    .onEnd(() => {
      if (sharedY.value > -windowHeight / 2) {
        scrollTo(-windowHeight / 3)
      } else {
        scrollTo(maxTranslateY)
      }
    })


  const bottomSheetStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: sharedY.value }] }
  })

  useEffect(() => {
    scrollTo(-windowHeight / 3)

    dispatch(loadEntries([]))
    dispatch(loadCalendar([]))
  }, [])

  return (
    <View style={$container}>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <MemoTimetable />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[$bottomSheet, bottomSheetStyle]}>
            {isMarking ? <ColorPicker /> : <DayInfo />}
          </Animated.View>
        </GestureDetector>

      </GestureHandlerRootView>
    </View>
  )
}

const MemoTimetable = React.memo(Timetable)

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"

}

const $bottomSheet: ViewStyle = {
  height: windowHeight,
  width: "100%",
  backgroundColor: "rgb(255,255,255)",
  position: "absolute",
  top: windowHeight,

  borderWidth: 1,
  alignItems: "center",
  paddingTop: 5,

  overflow: "hidden"
}
