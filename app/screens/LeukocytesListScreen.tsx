import React, { useEffect, useState } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { LeukocytesBlock } from "../components/LeukocytesBlock"
import { Header, CountModal } from "../components"
import { useAppDispatch, useAppSelector } from "../store/store"
import {
  emptyItem,
  loadLeukocytesBlocks,
  updateLeukocytesBlocks
} from "../store/LeukocytesBlocks/action"


export const LeukocytesListScreen = ({ navigation }) => {

  const [modalCount, setModalCount] = useState(false)
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
    navigation.navigate("LeukocytesCounter", { item: items[key], index: key })
  }

  const confirmCount = (count) => {
    setModalCount(false)
    dispatch(updateLeukocytesBlocks(count))
  }

  const addOneCount = () => {
    dispatch(updateLeukocytesBlocks(items.length + 1))
    navigation.navigate("LeukocytesCounter", { item: emptyItem, index: items.length })
  }

  return (
    <View style={$screenView}>
      <CountModal visible={modalCount}
                  setVisible={setModalCount}
                  onConfirm={confirmCount}
                  currentValue={items.length}
                  title={"Скільки аналізів?"}
      />
      <Header
        onPressPlus={() => setModalCount(true)}
        onPressReset={() => dispatch(updateLeukocytesBlocks(items.length))}
      />
      <ScrollView contentContainerStyle={s.container}>
        {items.map((el, index) =>
          <LeukocytesBlock
            onPress={() => setCounter(index)}
            key={index}
            index={index + 1}
            block={el}
          />)}
        <TouchableOpacity style={s.addItem} onPress={addOneCount}>
          <Text style={s.addItemText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
const windowWidth = Dimensions.get("window").width
const blockWidth = (windowWidth / 2) - 15

const $screenView: ViewStyle = {
  flex: 1,
  backgroundColor: "#ffffff"
}

const s = StyleSheet.create({
  addItem: {
    alignItems: "center",
    borderColor: "rgba(122,28,188,1)",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    marginHorizontal: 5,
    marginVertical: 10,
    width: blockWidth
  },
  addItemText: {
    color: "rgb(122,28,188)",
    fontSize: 120
  },
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 5,
    width: "100%"
  }
})
