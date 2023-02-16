import React, { useState } from "react"
import { Button, Text, View, ViewStyle } from "react-native"

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
} from "react-native-document-picker"


export const FilesScreen = ({ navigation }) => {
  const [files, setFiles] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >()
  const  pickFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickMultiple({
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
        allowMultiSelection: true,
        type: DocumentPicker.types.pdf,
      })
      console.log(pickerResult)
      setFiles(pickerResult)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={$container}>
      <Button title={'pick'} onPress={pickFile}/>
      <View>
        {files?files.map(f=>{
          return <Text key={f.name}>{f.name}</Text>
        }):null}
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"
}
