import React, { useState } from "react"
import {  View,  Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import {
  getMonthsInYear,
} from "../../utils/dateFormat"
import { Icon } from "../../components"
import { MonthOfYear } from "./components/MonthOfYear"

import { useAppSelector } from "../../store/store"



const screenWidth = Dimensions.get("screen").width
export const YearCalendarScreen = ({ navigation }) => {

  const [selectedYear, setSelectedYear] = useState(2023)

  const marked = useAppSelector(state => state.CalendarReducer.calendar)

  const monthsDays = getMonthsInYear(selectedYear)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Icon icon={"cross"} size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => setSelectedYear(selectedYear - 1)}>
            <Icon icon={"caret_back"} size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.year}>{selectedYear}</Text>
          <TouchableOpacity onPress={() => setSelectedYear(selectedYear + 1)}>
            <Icon icon={"caret_forward"} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Icon icon={"cross"} size={24} color="white" />
        </View>
      </View>

      <View style={styles.container}>

        {monthsDays.map((month, index) => <MonthOfYear key={index}
                                                       month={month}
            marked={marked}
        />)}

      </View>
    </View>
  )
}

const monthWidth = screenWidth / 3 - 14

const styles = StyleSheet.create({

  container: {
    height: "100%",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

    marginHorizontal: 1
  },
  header: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,

  },
  year: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 10
  },

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
    marginVertical: 2,
    fontSize: 10,

    width: monthWidth / 7,
    alignItems: "center",

    textAlign: "center",
    color: "black"

  }
})
