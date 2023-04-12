import React, { useEffect, useState } from "react"
import { ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ConfirmModal, Icon } from "../../components"
import { colors } from "../../theme"
import { Item } from "./components/Item"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { deleteEntre, loadEntries } from "../../store/Statistic/action"
import { compareMonths, getTodayDate, ukrainianMonthDay, ukrainianMonthYear } from "../../utils/dateFormat"


export const EntriesScreen = ({ navigation }) => {
  const entries = useAppSelector(state => state.StatisticReducer.entries)
  const dispatch = useAppDispatch()

  const [modal, setModal] = useState(false)
  const [indexForConfirm, setIndexForConfirm] = useState(-1)

  useEffect(() => {
    dispatch(loadEntries([]))
  }, [])

  const keys = Object.keys(entries)

  const countTotalForMonth = (date) => {
    const neededMonth = date[5] + date[6]
    let suma = 0
    keys.forEach((key) => {
      const keyMonth = key[5] + key[6]
      if (keyMonth === neededMonth) {
        // @ts-ignore
        suma += entries[key].total
      }
    })
    return suma
  }

  return (
    <View style={$screenView}>
      <ConfirmModal text={"Видалити"} visible={modal} setVisible={setModal}
                    onConfirm={() => dispatch(deleteEntre(keys[indexForConfirm]))} />
      <View style={$header}>

      </View>
      <View style={$itemAddContainer}>
        <TouchableOpacity style={$itemAdd} onPress={() => navigation.navigate("NewEntries")}>
          <Icon icon={"plus"} color={colors.palette.primary200} size={70} />
        </TouchableOpacity>
      </View>

      <ScrollView>

        {keys ? keys.map((el, index) =>
          <View key={Math.random()}>
            {compareMonths(keys[index], keys[index - 1]) ?
              <View

                style={{
                marginHorizontal: 32,
                marginBottom:5,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
              }}>
                <Text style={{ color: colors.palette.primary200, fontSize: 18, fontWeight: "300" }}>
                  {ukrainianMonthYear(new Date(keys[index]))}
                </Text>
                <Text style={{ color: "black", fontSize: 18, fontWeight: "300" }}>
                  {countTotalForMonth(keys[index])}₴</Text>
              </View> : null}
            <Item
                  date={el}
                  item={entries[el]}
                  onLongPress={() => {
                    setIndexForConfirm(index)
                    setModal(true)
                  }
                  } />
          </View>
        ) : null}

      </ScrollView>

    </View>
  )
}

const $screenView: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingBottom: 72
}
const $header: ViewStyle = {
  backgroundColor: colors.background,
  paddingTop: 20,
  paddingBottom: 10,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 30,
  flexDirection: "row"
}
const $date: TextStyle = {
  color: colors.text,
  fontWeight: "300",
  fontSize: 22
}

const $itemAddContainer: ViewStyle = {
  position: "absolute",
  zIndex: 10,
  bottom: 0,
  paddingVertical: 5,
  width: "100%",
  backgroundColor: "white",
  alignItems: "center",
  borderTopWidth: 1,
  borderColor: "rgba(0,0,0,0.07)"
}
const $itemAdd: ViewStyle = {}
