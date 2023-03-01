import React, { useState } from "react"
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../../theme"
import { DatePicker, Icon, PopupColorPicker } from "../../components"
import { Analyzes } from "./components/Analyzes"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { addEntre } from "../../store/Statistic/action"


export const NewEntriesScreen = ({ navigation }) => {
  const entries = useAppSelector(state => state.StatisticReducer.entries)
  const [total, setTotal] = useState(0)
  const [counts, setCounts] = useState([
    { title: "ЗАК", value: 0 },
    { title: "БАК", value: 0 },
    { title: "Цито", value: 0 },
    { title: "Сеча", value: 0 },
    { title: "Кал", value: 0 }
  ])
  const [date, setDate] = useState(new Date())
  const [color, pickColor] = useState("#7A1CBCFF")
  const [popupVisible, setPopupVisible] = useState(false)
  const dispatch = useAppDispatch()

  const confirmDone = () => {

    const exist = entries.some(el=>new Date(el.date).toDateString() === date.toDateString())

    if(total !== 0 && !exist) {
      dispatch(addEntre({
        date:date,
        color:color,
        analyzes:counts,
        total:total
      }))
      navigation.goBack(null)
    }
  }

  return (
    <View style={$screenView}>
      <PopupColorPicker pickColor={pickColor} visible={popupVisible} setVisible={setPopupVisible}/>
      <View style={$header}>
        <Icon icon={"cross"} size={32} onPress={() => navigation.goBack(null)} />
        <DatePicker date={date} setDate={setDate} />
        <TouchableOpacity style={[$pickColor, {backgroundColor:color}]}
                          onPress={()=>setPopupVisible(true)}/>
      </View>
      <Analyzes value={total}
                counts={counts}
                setValue={setTotal}
                setCounts={setCounts} />
      <View style={$bottom}>
        <TouchableOpacity style={$btnDone} onPress={confirmDone}>
          <Text style={$btnDoneText}>Зберегти</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const $screenView: ViewStyle = {
  flex: 1,

  backgroundColor: "#ffffff"
}
const $header: ViewStyle = {
  backgroundColor: colors.background,
  paddingTop: 20,
  paddingBottom: 10,
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 30,
  flexDirection: "row"

}

const $pickColor: ViewStyle = {
  height: 32,
  width: 32,
  borderRadius: 50
}

const $btnDone: ViewStyle = {
  width: 180,
  height: 50,
  borderWidth: 1,
  borderRadius: 25,

  justifyContent: "center",
  alignItems: "center"

}
const $bottom: ViewStyle = {
  position: "absolute",
  bottom: 40,
  width: "100%",
  alignItems: "center"

}

const $btnDoneText: TextStyle = {
  color: colors.text,
  fontWeight: "400",
  fontSize: 20,

  alignItems: "center",
  textAlign: "center"

}
