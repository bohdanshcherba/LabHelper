import React, { useEffect, useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { LeukocytesBlock } from "../components/LeukocytesBlock"
import { ConfirmModal, Icon } from "../components"
import { CalculatorModal } from "../components/CalculatorModal"

import { useAppDispatch, useAppSelector } from "../store/store"
import { emptyItem, loadLeukocytesBlocks, updateLeukocytesBlocks } from "../store/LeukocytesBlocks/action"
import { generateEmptyItems } from "../utils/gorayev"
import { CountModal } from "../components/CountModal"
import { saveGorayevItems, updateGorayevItems } from "../store/GorayevItems/action"




export const LeukocytesListScreen = ({ navigation }) => {

  const [modal, setModal] = useState(false)
  const [modalCount, setModalCount] = useState(false)
  const [calculatorVisible, setCalculatorVisible] = useState(false)
  const [items, updateItems] = useState<any>([])

  const { leukocytesBlocks } = useAppSelector((state) => state.LeukocytesReducer)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadLeukocytesBlocks([]))
  }, [])

  useEffect(() => {
    updateItems(leukocytesBlocks)
  }, [leukocytesBlocks])


  const setCounter = (key) => {
    navigation.navigate("LeukocytesCounter", { item: items[key], index:key })
  }

  const confirmCount = (count) => {
    setModalCount(false)
    dispatch(updateLeukocytesBlocks(count))
  }

  const addOneCount = () => {
    dispatch(updateLeukocytesBlocks(items.length+1))
    navigation.navigate("LeukocytesCounter", { item: emptyItem , index:items.length })

  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <CountModal visible={modalCount}
                  setVisible={setModalCount}
                  onConfirm={confirmCount}
                  currentValue={items.length}
                  title={"How much items?"}

      />
      <ConfirmModal visible={modal}
                    setVisible={setModal}
                    onConfirm={() => {
                      dispatch(updateLeukocytesBlocks(items.length))
                    }} />
      <CalculatorModal visible={calculatorVisible} setVisible={setCalculatorVisible} />
      <View style={$header}>
        <Icon icon={"plus"} size={35} style={{ marginRight: 15 }} onPress={() => setModalCount(true)} />
        <Icon icon={"reset"} size={35} style={{ marginRight: 15 }} onPress={() => setModal(true)} />
        <Icon icon={"calculator"} size={35} onPress={() => setCalculatorVisible(true)} />
      </View>
      <ScrollView contentContainerStyle={s.container}>
        {items.map((el, index) => <LeukocytesBlock onPress={()=>setCounter(index)} key={index} index={index + 1} block={el} />)}

        <TouchableOpacity style={s.addItem} onPress={addOneCount}>
          <Text style={s.addItemText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
const windowWidth = Dimensions.get("window").width
const blockWidth = (windowWidth / 2) - 15
const s = StyleSheet.create({
  container: {

    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 5
  },

  addItem: {
    width: blockWidth,

    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(122,28,188,1)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"

  },
  addItemText: {
    color: "rgb(122,28,188)",
    fontSize: 120
  }

})
const $header: ViewStyle = {
  backgroundColor: "#ffffff",
  paddingTop: 20,
  paddingBottom: 10,
  justifyContent: "flex-end",
  paddingHorizontal: 30,
  flexDirection: "row"
}
