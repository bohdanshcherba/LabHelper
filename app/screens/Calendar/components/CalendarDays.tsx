import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import Animated, {
  interpolate, runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from "react-native-reanimated"



const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const maxTranslateY = -windowHeight + 400
export const CalendarDays = ({days, markedDays, resize}) => {

  const size = useDerivedValue(() => {
    console.log(resize.value)
    return interpolate(resize.value, [-windowHeight / 2, 30000], [40, 80])
  })
  const isMarkedDay = (day) => {
    return markedDays.some((markedDay) => markedDay.getTime() === day.getTime())
  }

  const itemStyle = useAnimatedStyle(() => {
    return { height: size.value,
      width:windowWidth / 7 - 10
    }
  })

  return <View style={{ flexDirection: "row", flexWrap: "wrap", width:windowWidth }}>
        {days.map(day => {
            if (day && isMarkedDay(day)) {
              return <Animated.View key={Math.random()} style={[s.day, { backgroundColor: "red" },itemStyle]}>
                <Text style={s.day_text}>{day ? day.getDate() : ""}</Text>
              </Animated.View>
            }
            return <Animated.View key={Math.random()} style={[s.day, itemStyle]}>
              <Text style={s.day_text}>{day ? day.getDate() : ""}</Text>
            </Animated.View>
          }
        )}
      </View>
}


const s = StyleSheet.create({

  day: {
    height: 40,
    margin: 5,
    backgroundColor:'blue',
    width: windowWidth / 7 - 10,
    alignItems: "center"

  },

  day_text: {
    fontSize: 18,
    fontWeight: "300",
    color: "black"
  },



})
