import React, { FC } from "react"
import { Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../../../theme"
import { deleteEntre } from "../../../store/Statistic/action"
import { useAppDispatch } from "../../../store/store"

interface Props {
  item?: any,
  date:string,
  onLongPress:any
}

export const Item: FC<Props> = (props) => {
  const { item, date,  onLongPress } = props

  const options = { month: "long", day: "numeric" }
  const locale = "uk-UA"
  // @ts-ignore
  const formatter = new Intl.DateTimeFormat(locale, options)

  const total = item.analyzes.reduce((acc, curr) => acc + curr.value, 0)

  const newDate = new Date(date)

  return <TouchableOpacity style={$item} onLongPress={onLongPress}>
    <View style={{flexDirection:"row", alignItems:"center", }}>
      <Text style={{color:'black', fontSize:18}}>
        {formatter.format(newDate)} | {total} {total===1? 'аналіз': total<=4?'аналізи':'аналізів' }
      </Text>
    </View>
    <View style={{}}>
      <Text style={{color:colors.palette.primary100, fontSize:20}}>
        {item.total}₴
      </Text>
    </View>
  </TouchableOpacity>
}

const $item: ViewStyle = {

  marginHorizontal:10,
  paddingHorizontal:15,
  height: 60,

  alignItems:'center',
  borderWidth:1,
  borderColor:colors.text,
  borderRadius:20,
  marginBottom:10,
  flexDirection:'row',
  justifyContent:'space-between'
}
