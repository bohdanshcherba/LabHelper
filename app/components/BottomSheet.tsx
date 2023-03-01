import React, { useCallback, useMemo, useRef } from "react"
import { View, Text, StyleSheet } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import { colors } from "../theme"


export const BottomSheetComp = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ["40%", "900%"], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor: colors.palette.secondary100,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15
        }}
        handleIndicatorStyle={{backgroundColor:'white'}}
        backgroundStyle={{
          backgroundColor:colors.palette.secondary100,
        }}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  contentContainer: {

    flex: 1,
    width: "100%",
    backgroundColor: colors.palette.secondary100
  }
})
