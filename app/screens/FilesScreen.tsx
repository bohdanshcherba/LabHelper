import React, { useEffect, useState } from "react"
import {
  Button,
  Dimensions,
  Image,
  ImageStyle,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native"

import DocumentPicker from "react-native-document-picker"
import FileViewer from "react-native-file-viewer"
import { Icon } from "../components"
import { useAppDispatch, useAppSelector } from "../store/store"
import { addFiles, loadFiles, updateFiles } from "../store/app/action"
import { FileType } from "../common/types/File.type"
import { Header } from "../components/Header"


const defaultImage = require("../../assets/images/test.jpg")

const FileItem = ({ index, file }: { index: number, file: FileType }) => {

  const dispatch = useAppDispatch()
  return <TouchableOpacity
    onLongPress={() => dispatch(updateFiles(index))}
    onPress={() => FileViewer.open(file.fileCopyUri)}
    style={$file}>
    <View style={$fileImage}>
      <Image source={file.previewImgUri !== "" ? { uri: file.previewImgUri } : defaultImage} style={$image} />
    </View>
    <Text style={$fileText}>
      {file.name}
    </Text>
  </TouchableOpacity>
}

export const FilesScreen = ({ navigation }) => {
  const [files, setFiles] = useState<Array<FileType>>()

  const filesAp = useAppSelector(state => state.DefaultAppReducer.files)
  useEffect(() => {
    setFiles(filesAp)
  }, [filesAp])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadFiles([]))
  }, [])

  const pickFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickMultiple({
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
        allowMultiSelection: true,
        type: DocumentPicker.types.pdf
      })

      dispatch(addFiles(pickerResult))

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={$container}>
      <Header calculator onPressPlus={pickFile}/>

      <ScrollView contentContainerStyle={$fileContainer}>
        {files?.length!==0 ? files?.map((file, i) =>
          <FileItem key={i} index={i} file={file} />)
          : <Text style={{color:'black', fontSize: 15}}>No files yet... </Text> }
      </ScrollView>

    </View>
  )
}
const windowWidth = Dimensions.get("window").width
const blockWidth = (windowWidth / 2) - 15
const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff"
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
const $fileContainer: ViewStyle = {
  width: "100%",
  backgroundColor: "#ffffff",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center"
}
const $file: ViewStyle = {
  marginVertical: 10,
  marginHorizontal: 5,
  borderRadius: 20,
  width: blockWidth
}
const $fileImage: ViewStyle = {
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  height: 220,
  width: "100%",
  borderWidth: 1,
  borderColor: "#000"
}
const $image: ImageStyle = {
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  height: "100%",
  width: "100%"

}


const $fileText: TextStyle = {
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  borderWidth: 1,
  borderTopWidth: 0,
  paddingVertical: 10,
  color: "#000",
  backgroundColor: "#fff",
  textAlign: "center"
}
