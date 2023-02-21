import React, { FC, useEffect, useState } from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { colors } from "../../../theme"
import { NumberPicker } from "../../../components"


interface Props {
  counts: any
  setCounts: any,
  value: any,
  setValue: any,
}

export const Analyzes: FC<Props> = (props) => {
  const { counts, setCounts, value, setValue } = props

  const handleIncrement = (index) => {
    setCounts(prevCounts => {
      const newCounts = [...prevCounts]
      newCounts[index] = { ...prevCounts[index], value: prevCounts[index].value + 1 }
      return newCounts
    })
  }

  const handleDecrement = (index) => {
    setCounts(prevCounts => {
      const newCounts = [...prevCounts]
      newCounts[index] = { ...prevCounts[index], value: prevCounts[index].value - 1 }
      return newCounts
    })
  }

  const handleTyping = (index, value) => {
    setCounts(prevCounts => {
      const newCounts = [...prevCounts]
      newCounts[index] = { ...prevCounts[index], value: value }
      return newCounts
    })
  }

  useEffect(() => {
    const total = counts.reduce((acc, curr) => acc + curr.value, 0)
    if (total === 0){
      setValue(0)
    }
    else if (total <= 5) {
      setValue(350)
    }
    else {
      setValue(350 + (total - 5) * 20)
    }

  }, [counts])

  return <View>
    {
      counts.map((count, index) => {
        return <NumberPicker key={count.title}
                             text={count.title}
                             value={count.value}
                             setValue={(num) => handleTyping(index, num)}
                             increment={() => handleIncrement(index)}
                             decrement={() => handleDecrement(index)}
        />
      })
    }


    <View style={$total}>
      <Text style={$totalText}>Сума:</Text>
      <Text style={$totalText}>{value}</Text>
    </View>
  </View>
}

const $total: ViewStyle = {
  paddingTop: 10,
  marginTop: 10,
  borderTopWidth: 1,
  justifyContent: "space-between",
  paddingLeft: 30,
  paddingRight: 10,
  flexDirection: "row"
}

const $totalText: TextStyle = {
  color: colors.text,
  fontWeight: "500",
  fontSize: 30,
  paddingRight: 15
}
