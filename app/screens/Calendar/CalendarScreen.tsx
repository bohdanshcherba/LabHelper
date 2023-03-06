import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Dimensions, View, ViewStyle, Text } from "react-native"


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


const windowHeight = Dimensions.get("window").height

const maxTranslateY = -windowHeight /2
export const CalendarScreen = ({ navigation }) => {

  const sharedY = useSharedValue(0)
  const active = useSharedValue(false)

  const scrollTo = useCallback((destination: number) => {
    "worklet"
    active.value = destination !== 0

    sharedY.value = withSpring(destination, { damping: 50 })
  }, [])


  const scaleY = useDerivedValue(() => {
    return interpolate(sharedY.value, [-windowHeight / 2, maxTranslateY - 1], [windowHeight/2, 200])
  })

  const context = useSharedValue({ y: 0, scale: 0 })

  const gesture = Gesture.Pan()
    .onStart(event => {
      context.value = { y: sharedY.value, scale: scaleY.value }
    })
    .onChange(event => {
      sharedY.value = event.translationY + context.value.y
      sharedY.value = Math.max(sharedY.value, maxTranslateY)

    }).onEnd(() => {
      if (sharedY.value > -windowHeight / 3) {
        scrollTo(-windowHeight / 4)
      } else {
        scrollTo(maxTranslateY)
      }
    })


  const bottomSheetStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: sharedY.value }] }
  })


  const calendarResizingStyle = useAnimatedStyle(() => {

    return {
     // transform: [{ scaleY: scaleY.value }]
      height:  scaleY.value
    }
  })

  useEffect(() => {
     scrollTo(-windowHeight / 4)
    //scrollTo(0)
  }, [])


  return (
    <View style={$container}>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View style={$calendarWrap}>
            <Timetable resize={scaleY}/>
        </Animated.View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[$bottomSheet, bottomSheetStyle]}>

            <Text>Money</Text>
          </Animated.View>
        </GestureDetector>

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
const $calendarWrap: ViewStyle = {

  height: 200,
  width: "100%",
}
const $bottomSheet: ViewStyle = {
  height: windowHeight,
  width: "100%",
  backgroundColor: "rgb(255,255,255)",
  position: "absolute",
  top: windowHeight,
  borderRadius: 25,
  borderWidth:1,
  alignItems:'center',
  paddingTop:20,
}
