import React, { useEffect, useState } from "react"
import { ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ConfirmModal, Icon } from "../../components"
import { colors } from "../../theme"
import { Item } from "./components/Item"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { deleteEntre, loadEntries } from "../../store/Statistic/action"


export const EntriesScreen = ({ navigation }) => {
  const entriesDef = useAppSelector(state => state.StatisticReducer.entries)
  const dispatch = useAppDispatch()
  const [entries, SetEntries] = useState(entriesDef)
  const [modal, setModal] = useState(false)
  const [indexForConfirm, setIndexForConfirm] = useState(-1)

  useEffect(() => {
    dispatch(loadEntries([]))
  }, [])
  useEffect(() => {
    SetEntries(entriesDef)
  }, [entriesDef])


  return (
    <View style={$screenView}>
      <ConfirmModal text={'Delete'}  visible={modal} setVisible={setModal} onConfirm={()=>dispatch(deleteEntre(indexForConfirm))} />
      <View style={$header}>
        <Text style={$date}>21 Лютого</Text>
      </View>
      <ScrollView>
        <TouchableOpacity style={$itemAdd} onPress={() => navigation.navigate("NewEntries")}>
          <Icon icon={"plus"} size={38} />
        </TouchableOpacity>
        {entries?entries.map((el,index) =>
          <Item key={index} item={el} onLongPress={()=> {
            setIndexForConfirm(index)
            setModal(true)
          }
          }/>):null}

      </ScrollView>

    </View>
  )
}

const $screenView: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background
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
const $itemAdd: ViewStyle = {

  marginHorizontal: 10,
  height: 60,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: colors.text,
  borderRadius: 20,
  marginBottom: 10
}
