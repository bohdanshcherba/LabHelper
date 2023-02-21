import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"

import { EntreType } from "../../common/types/Entre.type"


export const loadEntries = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_ENTRIES,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    let items = await storage.load(StorageKey.ENTRIES)

    if (!items) {
      items = []
      await storage.save(StorageKey.ENTRIES, items)
    }
    return items
  })

export const addEntre = createAsyncThunk<any, EntreType, AsyncThunkConfig>(ActionType.ADD_ENTRE,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const entries = [...getState().StatisticReducer.entries]
    entries.push(payload)
    try {
      entries.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime())
    }
    catch (e) {
      console.log(e)
    }
    await storage.save(StorageKey.ENTRIES, entries)

    return entries
  })

export const deleteEntre = createAsyncThunk<any, number, AsyncThunkConfig>(ActionType.DELETE_ENTRE,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const entries = [...getState().StatisticReducer.entries]
    entries.splice(payload, 1)

    await storage.save(StorageKey.ENTRIES, entries)

    return entries
  })
