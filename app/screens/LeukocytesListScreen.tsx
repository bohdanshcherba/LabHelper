import React, { useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { LeukocytesBlock } from "../components/LeukocytesBlock"
import { Icon } from "../components"
import { CalculatorModal } from "../components/CalculatorModal"
import { LeukocytesBlockType } from "../common/types/Leukocytes.type"


const data: Array<LeukocytesBlockType> = [
  {
    title: "Leukocytes",
    leukocytes: [
      { name: "basophil", value: 0 },
      { name: "eosinophil", value: 0 },
      { name: "monocyte", value: 0 },
      { name: "banded", value: 0 },
      { name: "mature", value: 0 },
      { name: "lymphocyte", value: 0 },
      { name: "platelet", value: 0 }
    ]
  }

]

export const LeukocytesListScreen = ({ navigation }) => {

  const [modal, setModal] = useState(false)
  const [modalCount, setModalCount] = useState(false)
  const [calculatorVisible, setCalculatorVisible] = useState(false)

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <CalculatorModal visible={calculatorVisible} setVisible={setCalculatorVisible} />
      <View style={$header}>
        <Icon icon={"plus"} size={35} style={{ marginRight: 15 }} onPress={() => setModalCount(true)} />
        <Icon icon={"reset"} size={35} style={{ marginRight: 15 }} onPress={() => setModal(true)} />
        <Icon icon={"calculator"} size={35} onPress={() => setCalculatorVisible(true)} />
      </View>
      <ScrollView contentContainerStyle={s.container}>
        {data.map((el, index) => <LeukocytesBlock key={index} index={index + 1} block={el} />)}

        <TouchableOpacity style={s.addItem} onPress={() => navigation.navigate("LeukocytesCounter")}>
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
