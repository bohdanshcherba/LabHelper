import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { colors } from "../theme"


const DatePicker = ({ date, setDate }) => {
  const options = { month: "long", day: "numeric" }
  const locale = "uk-UA"
  // @ts-ignore
  const formatter = new Intl.DateTimeFormat(locale, options)
  const onChange = (event, selectedDate) => {
    setDate(selectedDate)
  }
  const pickDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      is24Hour: true

    })
  }

  return <TouchableOpacity onPress={pickDate}>
    <Text style={s.input}>{formatter.format(date)}</Text>
  </TouchableOpacity>

}


const s = StyleSheet.create({
  input: {
    color: colors.text,
    fontSize: 25,
    fontWeight: "300"
  }
})

export { DatePicker }
