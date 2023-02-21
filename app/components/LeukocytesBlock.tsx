import React from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { LeukocytesItem } from "./LeukocyteItem"
import { LeukocytesBlockType } from "../common/types/Leukocytes.type"


export const LeukocytesBlock = ({index, block, onPress}:{
  index:number,
  block:LeukocytesBlockType
  onPress: any
}) => {


  return <TouchableOpacity style={s.block} onPress={onPress}>
    <View style={s.opacity}>
      <Text style={s.opacityText}>{index}</Text>
    </View>
    <View style={s.blocks}>
      {block.leukocytes.map((el,index)=>
        <LeukocytesItem key={index} typeImage={el.name} value={el.value}/>)}
      <View style={s.longItem}>
        <Text style={s.longItemText}>{block.title} </Text>
      </View>
    </View>
  </TouchableOpacity>
}

const windowWidth = Dimensions.get("window").width
const blockWidth = (windowWidth / 2) - 15
const s = StyleSheet.create({
  opacity: {
    position:'absolute',

    width:'100%',
    height:150,
    zIndex: 10,
    top:0,
    alignItems:"center",
  },
  opacityText:{
    color:'rgba(122,28,188,0.2)',
    fontSize: 120,

  },
  block: {
    width: blockWidth,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(122,28,188,1)',
    borderRadius: 20,

  },

  blocks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  longItem: {
    width: ((blockWidth / 3) - 5 * 2) * 2,

    marginHorizontal: 5,
    marginVertical: 5,
    alignItems:'center',
    justifyContent:'center',


  },
  longItemText: {
    borderBottomWidth:1,
    borderColor: 'black',
    textAlign:'center',
    paddingHorizontal:5,
    paddingVertical:3,
    color: "black",
    fontSize: 14
  }

})
