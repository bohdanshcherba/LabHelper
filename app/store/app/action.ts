import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"



export const loadCalculatorValue = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_CALCULATOR,
  async (payload, { extra }) => {

    const { storage } = extra

    let value = await storage.load(StorageKey.CALCULATOR_VALUE)

    if (!value) {
      value = ""
    }


    return value
  })
export const saveCalculatorValue = createAsyncThunk<any, string, AsyncThunkConfig>(ActionType.SAVE_CALCULATOR,
  async (value, { extra}) => {

    const { storage } = extra

    await storage.save(StorageKey.CALCULATOR_VALUE, value)

    return value
  })
