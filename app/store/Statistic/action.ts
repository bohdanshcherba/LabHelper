import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"

import { EntreType } from "../../common/types/Entre.type"
import { formatDateForKey } from "../../utils/dateFormat"


export const loadEntries = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_ENTRIES,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    let items = await storage.load(StorageKey.ENTRIES)

    if (!items) {
      items = {}
      await storage.save(StorageKey.ENTRIES, items)
    }
    return items
  })

export const addEntre = createAsyncThunk<any, { date: Date, entre: EntreType }, AsyncThunkConfig>(ActionType.ADD_ENTRE,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    let entries = { ...getState().StatisticReducer.entries }
    const key = formatDateForKey(payload.date)

    entries[key] = payload.entre

    try {
      entries = Object.keys(entries)
        .sort(
        (a, b) => b.localeCompare(a))
        .reduce(
        (obj, key) => {
          obj[key] = entries[key]
          return obj
        },
        {}
      )
    } catch (e) {
      console.log(e)
    }

    await storage.save(StorageKey.ENTRIES, entries)

    return entries
  })

export const deleteEntre = createAsyncThunk<any, string, AsyncThunkConfig>(ActionType.DELETE_ENTRE,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const copy = { ...getState().StatisticReducer.entries }
    delete copy[payload]

    await storage.save(StorageKey.ENTRIES, copy)

    return copy
  })
