import React, { useEffect, useState } from "react"
import { View, ViewStyle, ScrollView } from "react-native"
import { Block, Header, CountModal } from "../components"
import { generateEmptyItems } from "../utils/gorayev"
import { useAppDispatch, useAppSelector } from "../store/store"
import { loadGorayevItems, saveGorayevItems, updateGorayevItems } from "../store/GorayevItems/action"


export const GorayevListScreen = ({ navigation }) => {

  const { gorayevItems } = useAppSelector((state) => state.AppReducer)
  const dispatch = useAppDispatch()

  const [modalCount, setModalCount] = useState(false)
  const [items, updateItems] = useState(generateEmptyItems(gorayevItems))

  useEffect(() => {
    dispatch(loadGorayevItems([]))
  }, [])

  useEffect(() => {
    updateItems(gorayevItems)
  }, [gorayevItems])

  const setCounter = (key) => {
    navigation.navigate("GorayevCounter", { item: items[key] })
  }

  const confirmCount = (count) => {
    setModalCount(false)
    dispatch(updateGorayevItems(count))
  }

  return (
    <View style={$screenView}>
      <CountModal visible={modalCount}
                  setVisible={setModalCount}
                  onConfirm={confirmCount}
                  currentValue={items.length / 2}
                  title={"Скільки пар?"}
      />
      <Header
        onPressPlus={() => setModalCount(true)}
        onPressReset={() => dispatch(saveGorayevItems(0))}
      />
      <ScrollView contentContainerStyle={$container}>
        {items.map((item, index) =>
          <Block onPress={() => setCounter(index)}
                 key={index}
                 item={item}
          />)}
      </ScrollView>
    </View>
  )
}

const $screenView: ViewStyle = {
  flex:1,
  backgroundColor: "#ffffff"
}

const $container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "#ffffff",
  flexWrap: "wrap",
  paddingBottom: 60
}
