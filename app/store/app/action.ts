import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"
import { DocumentPickerResponse } from "react-native-document-picker"

import { getPdfPreview } from "../../utils/files"


export const loadCalculatorValue = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_CALCULATOR,
  async (payload, { extra, getState }) => {

    return getState().DefaultAppReducer.calculatorValue
  })
export const saveCalculatorValue = createAsyncThunk<any, string, AsyncThunkConfig>(ActionType.SAVE_CALCULATOR,
  async (value, { extra }) => {

    return value
  })
export const loadFiles = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_FILES,
  async (payload, { extra, getState }) => {

    const { storage } = extra

    let files = await storage.load(StorageKey.FILES)

    if (!files) {
      files = []
      await storage.save(StorageKey.FILES, [])
    }

    return files
  })

export const updateFiles = createAsyncThunk<any, number, AsyncThunkConfig>(ActionType.SAVE_FILES,
  async (index, { extra, getState }) => {
    const oldFiles = getState().DefaultAppReducer.files

    const newArray = oldFiles.filter((_, i) => i !== index)

    const { storage } = extra
    await storage.save(StorageKey.FILES, newArray)

    return newArray
  })

export const addFiles = createAsyncThunk<any, Array<DocumentPickerResponse>, AsyncThunkConfig>(ActionType.SAVE_FILES,
  async (files, { extra, getState }) => {

    const { storage } = extra
    const oldFiles = getState().DefaultAppReducer.files
    const newFiles = files.map(async (file) => {
      return {
        fileCopyUri: file.fileCopyUri,
        name: file.name,
        previewImgUri: await getPdfPreview(file.fileCopyUri)
      }
    })
    const arr = Promise.all(newFiles)
      .then((resolvedPromisesArray) => {
        // @ts-ignore
        const combinedArray = resolvedPromisesArray.concat(oldFiles)
        const uniqueArray = [...new Map(combinedArray.map(obj => [obj.name, obj])).values()]
        storage.save(StorageKey.FILES, uniqueArray)
        return uniqueArray
      })
      .catch((error) => {
        console.error(error)
      })

    return arr
  })
