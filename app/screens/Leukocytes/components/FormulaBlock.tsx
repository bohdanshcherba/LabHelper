import * as React from "react"
import { Dimensions, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../../theme"
import { FormulaModal, Icon } from "../../../components"
import { useEffect, useState } from "react"
import { convertNumber } from "../../../utils/convertNumber"


export const FormulaBlock = ({ SOE, setSOE, NST, setNST, KP, setKP, TRO, setTRO }) => {

  const [modal, setModal] = useState({ visible: false, type: "" })

  const setModalVisible = (visible) => setModal({ visible: visible, type: modal.type })

  useEffect(() => {
    const x = Math.floor(SOE.C - (SOE.C * Number(SOE.B)) / Number(SOE.A))
    setSOE({ ...SOE, X: x ? x : 0 })
  }, [SOE.A, SOE.B, SOE.C])

  useEffect(() => {
    let x = Math.floor((Number(NST.A) / Number(NST.B)) * NST.C)
    x = x === Infinity ? 0 :x
    setNST({ ...NST, X: x ? x : 0 })
  }, [NST.A, NST.B, NST.C])

  useEffect(() => {
    let x = (Number(KP.A) * KP.C)/Number(KP.B)
    x = x === Infinity ? 0 :x
    setKP({ ...KP, X: x ? x.toFixed(1) : 0 })
  }, [KP.A, KP.B, KP.C])

  useEffect(() => {
    const x = (Number(TRO.A) * TRO.C * TRO.B)

    setTRO({ ...TRO, X: x ? Math.floor(x) : 0 })
  }, [TRO.A, TRO.B, TRO.C])

  const onSave = () => {
    setModal({ visible: false, type: "" })
  }

  return (
    <>
      <FormulaModal visible={modal.type === "SOE" ? modal.visible : false}
                    onConfirm={onSave}
                    setVisible={setModalVisible}
      >
        <View style={s.inputsBlock}>
          <TextInput style={s.input}
                     keyboardType={'numeric'}

                     value={SOE.A.toString()}
                     onChangeText={(t) => setSOE({ ...SOE, A: t })}
          />

          <Icon icon={"line"} size={20} />

          <TextInput style={s.input}
                     keyboardType={'numeric'}

                     value={SOE.B.toString()}
                     onChangeText={(t) => setSOE({ ...SOE, B: t })}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Icon icon={"cross_solution"} size={30} />
        </View>
        <View style={s.inputsBlock}>
          <TextInput style={s.input}
                     keyboardType={'numeric'}

                     value={SOE.C.toString()}
                     onChangeText={(t) => setSOE({ ...SOE, C: convertNumber(t) })}
          />
          <Icon icon={"line"} size={20} />
          <TextInput style={s.input} value={SOE.X.toString()} editable={false} />
        </View>
      </FormulaModal>
      <FormulaModal visible={modal.type === "NST" ? modal.visible : false}
                    onConfirm={onSave}
                    setVisible={setModalVisible}

      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <View style={nstStyle.inputsBlock}>
            <TextInput style={s.input}
                       value={NST.A.toString()}
                       keyboardType={'numeric'}
                       onChangeText={(t) => setNST({ ...NST, A: t })}
            />
            <View style={{ alignItems: "center" }}>
              <Icon icon={"line"} size={30} />
            </View>
            <TextInput style={s.input}
                       keyboardType={'numeric'}

                       value={NST.B.toString()}
                       onChangeText={(t) => setNST({ ...NST, B: t })}
            />
          </View>
          <Text style={{ color: "black", fontSize: 25 }}>✘</Text>
          <TextInput style={s.input}
                     keyboardType={'numeric'}

                     value={NST.C.toString()}
                     onChangeText={(t) => setNST({ ...NST, C: convertNumber(t) })} />
          <Text style={{ color: "black", fontSize: 30 }}>=</Text>
          <TextInput style={s.input}
                     editable={false}
                     value={NST.X.toString()}
                     onChangeText={(t) => setNST({ ...NST, X: convertNumber(t) })} />

        </View>

      </FormulaModal>
      <FormulaModal visible={modal.type === "KP" ? modal.visible : false}
                    onConfirm={onSave}
                    setVisible={setModalVisible}

      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <View style={{alignItems:'center'}}>
            <View style={nstStyle.inputsBlock}>
              <View style={{ alignItems: "center", flexDirection:'row' }}>
                <TextInput style={s.input}
                           keyboardType={'numeric'}

                           value={KP.A.toString()}
                           onChangeText={(t) => setKP({ ...KP, A: t })} />
                <Text style={{ color: "black", fontSize: 25 }}>✘</Text>
                <TextInput style={s.input}
                           keyboardType={'numeric'}

                           value={KP.C.toString()}
                           onChangeText={(t) => setKP({ ...KP, C: convertNumber(t) })} />
              </View>
              <View style={{flexDirection:'row'}}>
                <Icon icon={"line"} size={30} />
                <Icon icon={"line"} size={30} />
                <Icon icon={"line"} size={30} />
              </View>
            </View>
            <TextInput style={[s.input,{width: size}]}
                       keyboardType={'numeric'}

                       value={KP.B.toString()}
                       onChangeText={(t) => setKP({ ...KP, B: t })} />
          </View>
          <Text style={{ color: "black", fontSize: 30 }}>=</Text>
          <TextInput style={s.input}
                     editable={false}
                     value={KP.X.toString()}
                     onChangeText={(t) => setKP({ ...KP, X: convertNumber(t) })} />

        </View>

      </FormulaModal>
      <FormulaModal visible={modal.type === "ТРО" ? modal.visible : false}
                    onConfirm={onSave}
                    setVisible={setModalVisible}

      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop:50 }}>
                <TextInput style={s.input}
                           keyboardType={'numeric'}
                           value={TRO.A.toString()}
                           onChangeText={(t) => setTRO({ ...TRO, A: t })} />

                <Text style={{ color: "black", fontSize: 25 }}>✘</Text>

                <TextInput style={[s.input,{width: size}]}
                           keyboardType={'numeric'}

                           value={TRO.B.toString()}
                           onChangeText={(t) => setTRO({ ...TRO, B: convertNumber(t) })} />
                <Text style={{ color: "black", fontSize: 25 }}>✘</Text>
                <TextInput style={s.input}
                           keyboardType={'numeric'}

                           value={TRO.C.toString()}
                           onChangeText={(t) => setTRO({ ...TRO, C: convertNumber(t) })} />
                <Text style={{ color: "black", fontSize: 30 }}>=</Text>
                <TextInput style={s.input}
                           editable={false}
                           value={TRO.X.toString()}
                           onChangeText={(t) => setTRO({ ...TRO, X: convertNumber(t) })} />

        </View>

      </FormulaModal>
      <View style={$formulaBlock}>
        <TouchableOpacity style={$formulaBtn}
                          onPress={() => setModal({ visible: true, type: "ТРО" })}>
          <Text style={$formulaText}>ТРО</Text>
          <Text style={$formulaText}>{TRO.X.toString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={$formulaBtn}
                          onPress={() => setModal({ visible: true, type: "SOE" })}>
          <Text style={$formulaText}>ШОЕ</Text>
          <Text style={$formulaText}>{SOE.X.toString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={$formulaBtn}
                          onPress={() => setModal({ visible: true, type: "NST" })}>
          <Text style={$formulaText}>НСТ</Text>
          <Text style={$formulaText}>{NST.X.toString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={$formulaBtn}
                          onPress={() => setModal({ visible: true, type: "KP" })}>
          <Text style={$formulaText}>КП</Text>
          <Text style={$formulaText}>{KP.X.toString()}</Text>
        </TouchableOpacity>

      </View>
    </>
  )
}
const windowWidth = Dimensions.get("window").width
const size = windowWidth / 6
const btnSize = windowWidth / 5

const $formulaBlock: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
  paddingHorizontal: spacing.small
}

const $formulaBtn: ViewStyle = {
  borderWidth: 1,
  borderRadius: 15,
  borderColor: colors.palette.secondary100,
  paddingHorizontal: 10,
  height: btnSize,
  width: btnSize,
  alignItems: "center",
  justifyContent: "center"
}
const $formulaText: TextStyle = {

  textAlign: "center",
  color: "black",
  fontSize: 20

}

const s = StyleSheet.create({

  inputsBlock: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  input: {
    borderColor: colors.palette.secondary100,
    borderWidth: 1,
    borderRadius: 12,
    minWidth: size,
    maxWidth: size+10,
    height: size,
    color: "black",
    textAlign: "center",
    fontSize: 30

  }

})

const nstStyle = StyleSheet.create({

  inputsBlock: {
    alignItems: "center",

    justifyContent: "space-around"
  },
  innerContainer: {
    width: "100%",
    height: " 100%",
    justifyContent: "space-around",
    paddingHorizontal: size


  }

})
