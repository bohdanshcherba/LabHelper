import React, { FC, useState } from "react"
import { ImageStyle, View, ViewStyle } from "react-native"
import { Icon } from "./Icon"
import { CalculatorModal } from "./CalculatorModal"
import { ConfirmModal } from "./ConfirmModal"


interface Props {
  onPressPlus?: () => void;
  onPressReset?: () => void;
  calculator?: boolean
}

export const Header: FC<Props> = (props) => {
  const { onPressPlus, calculator=true, onPressReset } = props
  const [calculatorVisible, setCalculatorVisible] = useState(false)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

  return <View style={$header}>
    <CalculatorModal visible={calculatorVisible} setVisible={setCalculatorVisible} />

    <ConfirmModal visible={confirmModalVisible}
                  setVisible={setConfirmModalVisible}
                  onConfirm={onPressReset} />

    {onPressPlus ?
      <Icon icon={"plus"} size={35} style={$iconSpace} onPress={onPressPlus} />
      : null}
    {onPressReset ?
      <Icon icon={"reset"} size={35} style={$iconSpace} onPress={() => setConfirmModalVisible(true)} />
      : null}
    {calculator ?
      <Icon icon={"calculator"} size={35} onPress={() => setCalculatorVisible(true)} />
      : null}
  </View>
}

const $header: ViewStyle = {
  backgroundColor: "#ffffff",
  paddingTop: 20,
  paddingBottom: 10,
  justifyContent: "flex-end",
  paddingHorizontal: 30,
  flexDirection: "row"
}

const $iconSpace: ImageStyle = {
  marginRight: 15
}
