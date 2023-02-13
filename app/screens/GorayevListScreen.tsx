import React, { useEffect, useState } from "react"
import { View, ViewStyle, ScrollView } from "react-native"
import { Block, ConfirmModal, Icon } from "../components"
import { generateEmptyItems } from "../utils/gorayev"
import { useAppDispatch, useAppSelector } from "../store/store"
import { loadGorayevItems, saveGorayevItems, updateGorayevItem, updateGorayevItems } from "../store/app/action"
import { CountModal } from "../components/CountModal"
import { CalculatorModal } from "../components/CalculatorModal"


export const GorayevListScreen = ({ navigation }) => {
  const { gorayevItems } = useAppSelector((state) => state.AppReducer)
  const [modal, setModal] = useState(false)
  const [modalCount, setModalCount] = useState(false)
  const [calculatorVisible, setCalculatorVisible] = useState(false)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadGorayevItems([]))
  }, [])

  useEffect(() => {
    updateItems(gorayevItems)
  }, [gorayevItems])

  const [items, updateItems] = useState(generateEmptyItems(gorayevItems))

  const setCounter = (key) => {
    navigation.navigate("GorayevCounter", { item: items[key] })
  }


  const confirmCount = (count) => {
    setModalCount(false)
    dispatch(updateGorayevItems(count))
  }

  return (
    <View >
      <CountModal visible={modalCount}
                  setVisible={setModalCount}
                  onConfirm={confirmCount}
                  currentValue={items.length / 2}
      />
      <ConfirmModal visible={modal}
                    setVisible={setModal}
                    onConfirm={() => {
                      dispatch(saveGorayevItems(0))
                    }} />
      <CalculatorModal visible={calculatorVisible} setVisible={setCalculatorVisible} />
      <View style={$header}>
        <Icon icon={"plus"} size={35} style={{ marginRight: 15 }} onPress={() => setModalCount(true)} />
        <Icon icon={"reset"} size={35} style={{ marginRight: 15 }} onPress={() => setModal(true)} />
        <Icon icon={"calculator"} size={35} onPress={() => setCalculatorVisible(true)} />
      </View>
      <ScrollView contentContainerStyle={$container}>
        {items.map((item, index) => <Block onPress={() => setCounter(index)} key={index} item={item} />
        )}
      </ScrollView>
    </View>

  )
}

const $header: ViewStyle = {
  backgroundColor: "#ffffff",
  paddingTop: 20,
  paddingBottom: 10,
  justifyContent: "flex-end",
  paddingHorizontal: 30,
  flexDirection: "row"
}

const $container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "#ffffff",
  flexWrap: "wrap",
  paddingBottom: 60
}






