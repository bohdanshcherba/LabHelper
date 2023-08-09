import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"

import { formatDateForKey, ukrainianMonthDate } from "../../../utils/dateFormat"
import { daysNamesShort } from "../../../common/constants/calendar"
import { compareColor } from "../../../theme"

export const MonthOfYear = ({ month, marked }) => {
  console.log(marked)
  return (
    <View  style={styles.month}>
      <Text style={styles.monthTitle}>{ukrainianMonthDate(month[10])}</Text>
      <View style={styles.weekdays}>
        {daysNamesShort.map((day, i) => <Text style={styles.weekday} key={i}>{day}</Text>)}
      </View>

      <View style={styles.days}>
        {month.map((day, index) => {

          if(day){
            const markedDay =  marked[ formatDateForKey(day)]
            const background = markedDay ? markedDay.color : "white"
            const textColor = markedDay ? compareColor(markedDay.color) : 'black'

            return(
              <Text key={index} style={[styles.day, {
                backgroundColor:background,
                color: textColor,
              }]}>{day.getDate()}</Text>
            )
          }else{
            return (
              <Text key={index} style={styles.day}>{""}</Text>
            )
          }

        })}
      </View>
    </View>
  )
}
const screenWidth = Dimensions.get("screen").width

const monthWidth = screenWidth / 3 - 14
const styles = StyleSheet.create({

  month: {
    width: monthWidth,
    marginHorizontal: 5,
    backgroundColor: "#ffffff",
    marginVertical: 1,
    marginBottom: 10
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "black"
  },
  weekdays: {
    flexDirection: "row"

  },
  weekday: {
    width: monthWidth / 7,
    color: "black",
    textAlign: "center",
    fontSize: 10
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  day: {
    borderRadius:4,
    marginHorizontal: 1,
    marginBottom: 1,
    fontSize: 10,
    paddingVertical:2,
    width: monthWidth / 7 - 2,
    alignItems: "center",

    textAlign: "center",
    color: "black"

  }
})

