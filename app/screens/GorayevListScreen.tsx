import React, { useEffect, useState } from "react"
import { View, ViewStyle, ScrollView } from "react-native"
import { Block, Icon } from "../components"
import { generateEmptyItems } from "../utils/gorayev"
import { useAppDispatch, useAppSelector } from "../store/store"
import { loadGorayevItems } from "../store/app/action"


export const GorayevListScreen = ({ navigation }) => {
  const { gorayevItems } = useAppSelector((state) => state.AppReducer)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadGorayevItems([]))
  }, [])

  useEffect(() => {
    updateItems(gorayevItems)
  }, [gorayevItems])

  const [items, updateItems] = useState(generateEmptyItems(gorayevItems))

  const setCounter = (key) => {
    navigation.navigate("GorayevCounter", { item: items[key]})
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={$header}>
        <Icon icon={"plus"} size={35} style={{ marginRight: 15 }} />
        <Icon icon={"reset"} size={35} style={{ marginRight: 15 }} />
        <Icon icon={"calculator"} size={35} />
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






