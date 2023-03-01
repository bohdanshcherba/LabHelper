import React, { useEffect, useState } from "react"
import {
  BackHandler,
  Dimensions,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity, Vibration,
  View,
  ViewStyle
} from "react-native"
import { ConfirmModal, Icon } from "../components"
import { CalculatorModal } from "../components/CalculatorModal"
import { LeukocytesItem } from "../components/LeukocyteItem"
import { LeukocytesBlockType } from "../common/types/Leukocytes.type"
import { useAppDispatch } from "../store/store"
import { updateLeukocytesBlock } from "../store/LeukocytesBlocks/action"
import Sound from "react-native-sound"
import { saveCalculatorValue } from "../store/app/action"


const sound = require("../../assets/zvuk41.mp3")
const notifySound = require("../../assets/notify.wav")
const notify = new Sound(notifySound)
Sound.setCategory("Playback", true)
Sound.setMode("VideoChat")

export const LeukocytesCounterScreen = ({ navigation, route }) => {
  const ding = new Sound(sound)
  const ding2 = new Sound(sound)

  const { item, index } = route.params
  const dispatch = useAppDispatch()

  const [modal, setModal] = useState(false)
  const [calculatorVisible, setCalculatorVisible] = useState(false)
  const [text, setText] = useState(item.title)
  const [isEdit, setIsEdit] = useState(false)
  const [leukocytesArr, setLeukocytes] = useState([...item.leukocytes])
  const [total, setTotal] = useState(item.total)
  const [platelet, setPlatelet] = useState(item.platelet)

  useEffect(() => {
    ding.setSpeed(0.79)
    ding2.setSpeed(0.79)
    ding.stop()
    ding2.stop()
  }, [])

  const saveItem = () => {
    const newItem: LeukocytesBlockType = {
      title: text,
      total: total,
      leukocytes: leukocytesArr,
      platelet:platelet
    }

    dispatch(updateLeukocytesBlock({ item: newItem, index }))
  }

  const handleBack = () => {
    saveItem()
    dispatch(saveCalculatorValue(""))
    ding.release()
    ding2.release()
    return undefined
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack)
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBack)
  }, [leukocytesArr, text])

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => setIsEdit(false))
    return () => Keyboard.removeAllListeners("keyboardDidHide")
  }, [isEdit])

  const closeModal = () => {
    saveItem()
    dispatch(saveCalculatorValue(""))
    ding.release()
    ding2.release()
    navigation.goBack(null)
  }

  const incrementValue = (key) => {
    if (total < 100) {
      if (total % 2 === 0) {
        ding.play(() => ding.release())
      } else {
        ding2.play(() => ding2.release())
      }
      const newArr = leukocytesArr.map(
        (el, index) =>
          index === key ? { value: el.value + 1, name: el.name } : el)
      if (key !== 6) {
        setTotal(total + 1)
        if (total === 99) {
          notify.play()
        }
      }
      setLeukocytes(newArr)

    } else {
      if (key === 6) {
        if (total % 2 === 0) {
          ding.play(() => ding.release())
        } else {
          ding2.play(() => ding2.release())
        }

        const newArr = leukocytesArr.map(
          (el, index) =>
            index === key ? { value: el.value + 1, name: el.name } : el)
        setLeukocytes(newArr)
      }
    }
  }

  const decrementValue = (key) => {
    Vibration.vibrate(100)
    const newArr = leukocytesArr.map(
      (el, index) =>
        index === key ? { value: el.value - 1, name: el.name } : el)

    if (key !== 6) {
      setTotal(total - 1)
    }
    setLeukocytes(newArr)
    ding.release()
    ding2.release()
  }

  const clearItem = () => {
    setLeukocytes([
      { name: "basophil", value: 0 },
      { name: "eosinophil", value: 0 },
      { name: "monocyte", value: 0 },
      { name: "banded", value: 0 },
      { name: "mature", value: 0 },
      { name: "lymphocyte", value: 0 },
      { name: "platelet", value: 0 }
    ])
    setTotal(0)
    setText("")
    setPlatelet(false)
  }

  return (
    <SafeAreaView style={$container}>
      <CalculatorModal visible={calculatorVisible} setVisible={setCalculatorVisible} />
      <ConfirmModal visible={modal} setVisible={setModal} onConfirm={clearItem} />

      <View style={$header}>
        {isEdit ? <Icon icon={"check"} size={35} onPress={() => setIsEdit(false)} />
          : <Icon icon={"cross"} size={35} onPress={closeModal} />}

        <Text style={{ color: "black", fontSize: 18, fontWeight: "300" }}>{index + 1}</Text>
        <View style={{ flexDirection: "row" }}>
          <Icon icon={"reset"} size={35} style={{ marginRight: 15 }} onPress={() => setModal(true)} />
          <Icon icon={"calculator"} size={35} onPress={() => setCalculatorVisible(true)} />
        </View>
      </View>
      <View style={$valueContainer}>
        {isEdit ?
          <TextInput multiline
                     autoFocus={true}
                     onSubmitEditing={() => setIsEdit(false)}

                     style={[$valueText, { fontSize: 30 }]}
                     value={text}
                     onChangeText={e => setText(e)}
                     placeholder={"..."}
                     blurOnSubmit={true}

          />
          : <Text style={$valueText}>{total.toString()}</Text>
        }
      </View>
      <View style={$leukocytesBlock}>
        {leukocytesArr.map((el, index) => <LeukocytesItem
          onPress={() => incrementValue(index)}
          onLongPress={() => decrementValue(index)}
          size={"L"}
          key={index}
          typeImage={el.name}
          value={el.value}
          platelet={platelet}
          setPlatelet={setPlatelet}
        />)}
        <TouchableOpacity style={$longItem} onPress={() => setIsEdit(true)}>
          <TextInput multiline editable={false} style={$longItemText} value={text} placeholderTextColor={"#808080"}
                     placeholder={"Нотатка"} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}
const windowWidth = Dimensions.get("window").width

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"
}

const $header: ViewStyle = {
  position: "absolute",
  width: "100%",
  backgroundColor: "#ffffff",
  paddingTop: 20,
  paddingBottom: 10,
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
  flexDirection: "row",
  zIndex: 10
}

const $leukocytesBlock: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center"
}

const $longItem: ViewStyle = {
  width: ((windowWidth / 3) - 5 * 2) * 2,
  marginHorizontal: 5,
  marginVertical: 5,
  alignItems: "center",
  justifyContent: "center"
}

const $longItemText: TextStyle = {
  borderBottomWidth: 1,
  borderColor: "black",
  textAlign: "center",
  paddingHorizontal: 5,
  paddingVertical: 3,
  color: "black",
  fontSize: 34
}

const $valueContainer: ViewStyle = {
  width: "100%",

  marginTop: 100,
  marginBottom: 50,
  alignItems: "center",
  justifyContent: "center"

}

const $valueText: TextStyle = {
  width: "90%",

  textAlign: "center",
  color: "black",
  fontSize: 70,
  flexWrap: "wrap"
}
