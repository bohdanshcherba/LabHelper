import React, { useState } from "react"
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"


import { getTodayDate, ukrainianMonthYear } from "../../../utils/dateFormat"
import { Day } from "./CalendarDays"

import { CalendarList } from "react-native-calendars"
import {daysNames} from "../../../common/constants/calendar"


const windowWidth = Dimensions.get("window").width - 10


const now = new Date()
now.setHours(3, 0, 0, 0)

const MyCalendar = ({ setVisibleMonth }) => {
  return <CalendarList
    horizontal={true}
    firstDay={1}
    pagingEnabled
    dayComponent={({ date }) => <Day date={date} today={now} />}
    renderHeader={() => null}
    onMonthChange={(d) => setVisibleMonth(new Date(d.dateString))}
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
          borderBottomWidth: 1,
          height: 75
        },
        container:{
          padding: 0,
          margin:0,
        }
      }
    }}
  />
}

export const Timetable = ({navigation}) => {
  const [visibleMonth, setVisibleMonth] = useState(now)

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity style={s.header_month} onPress={()=>navigation.navigate("YearCalendar")}>
          <Text style={s.header_text}>
            {ukrainianMonthYear(visibleMonth)}
          </Text>
        </TouchableOpacity>
        <View style={s.weekDays}>
          {daysNames.map(d => <View key={d} style={s.day_week}>
            <Text style={s.header_day_text}>
              {d}
            </Text>
          </View>)}
        </View>
      </View>
      <View>
        <MemoMyCalendar setVisibleMonth={setVisibleMonth} />
      </View>

    </View>
  )
}
const MemoMyCalendar = React.memo(MyCalendar)

const s = StyleSheet.create({
  container: {

    width: "100%",
    height: "100%",
    alignItems: "center",

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
    borderColor: "rgba(147,147,147,0.18)",
    borderBottomWidth: 1,
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
