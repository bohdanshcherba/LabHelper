import React, { useState } from "react"
import { Text, View, ViewStyle, TextStyle, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { Block, Icon } from "../components"


export type Item = {
  key: number,
  type: 'Er'| 'Le',
  title: string,
  value: number
}



const setDefItems = (n) => {
  const items:Array<Item> = []
  let countRed = 1
  let countBlue = 1
  for(let i=0; i<n;i++){
    let title = ''
    let type:'Er'|'Le' = 'Er'
    if (i%2===0){
      title = 'Er'+countRed
      type = 'Er'
      countRed++
    }
    else{
      title = 'Le'+countBlue
      type = 'Le'
      countBlue++
    }
    items.push({key:i, title, type, value:0})
  }

  return items
}

export const GorayevListScreen = ({ navigation }) => {

  const [modal, setModal] = useState(false)
  const [currentCounter, setCurrentCounter] = useState<Item | null>(null)
  const [items, updateItems] = useState(setDefItems(20))


  const setCounter = (index) => {
    navigation.navigate('GorayevCounter', { props:"props" })
  }




  return (<View>
      <View style={$header}>
        <Icon icon={'calculator'} size={28} style={{marginRight:15}}/>
        <Icon icon={'reset'} size={28}/>
      </View>
      <ScrollView contentContainerStyle={$container}>
        { items.map((item,index)=> <Block onPress={() => setCounter(index)} key={index} item={item}/>
        )}
      </ScrollView>
  </View>

  )
}

const $header: ViewStyle = {

  backgroundColor: "#ffffff",
  paddingTop: 20,
  paddingBottom: 10,
  justifyContent:'flex-end',
  paddingHorizontal: 30,
  flexDirection: "row",

}
const $container: ViewStyle = {

  flexDirection: "row",
  justifyContent:'center',
  backgroundColor: "#ffffff",
  flexWrap: "wrap",

}






