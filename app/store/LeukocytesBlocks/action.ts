import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"
import { LeukocytesBlockType } from "../../common/types/Leukocytes.type"


export const emptyItem = {
  total: 0,
  title: "",
  leukocytes: [
    { name: "basophil", value: 0 },
    { name: "eosinophil", value: 0 },
    { name: "monocyte", value: 0 },
    { name: "banded", value: 0 },
    { name: "mature", value: 0 },
    { name: "lymphocyte", value: 0 },
    { name: "platelet", value: 0 }
  ],

  SOE: { A: '', B: '', C: 100, X: 0 },
  NST: { A: '', B: '', C: 100, X: 0 },
  KP: { A: '', B: '', C: 3, X: 0 },
  TRO: { A: '', B: '', C: 5, X: 0 },
}

export const loadLeukocytesBlocks = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_ITEMS,
  async (payload, { extra }) => {

    const { storage } = extra

    let items = await storage.load(StorageKey.LEUKOCYTES)

    if (!items) {
      items = [emptyItem]
      await storage.save(StorageKey.LEUKOCYTES, items)
    }
    return items
  })

export const saveLeukocytesBlocks = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.SAVE_ITEMS,
  async (payload, { extra, getState }) => {

    const items = getState().AppReducer.gorayevItems

    const { storage } = extra

    await storage.save(StorageKey.LEUKOCYTES, items)

    return items
  })

export const updateLeukocytesBlocks = createAsyncThunk<any, number, AsyncThunkConfig>(ActionType.SAVE_ITEMS,
  async (number, { extra, getState }) => {
    let items = getState().LeukocytesReducer.leukocytesBlocks
    const { storage } = extra
    if (number > items.length) {
      const emptyItems = Array(number - items.length).fill(emptyItem)
      // @ts-ignore

      items = [...items, ...emptyItems]

    } else if (number < items.length) {
      items = items.slice(0, number)
    } else {
      items = Array(items.length).fill(emptyItem)
    }

    await storage.save(StorageKey.LEUKOCYTES, items)

    return items
  })

export const updateLeukocytesBlock = createAsyncThunk<any, { item: LeukocytesBlockType, index: number }, AsyncThunkConfig>(ActionType.UPDATE_ITEM,
  async ({ item, index }, { extra, getState }) => {

    const { storage } = extra

    let items = getState().LeukocytesReducer.leukocytesBlocks
    items = items.map((el, i) => i === index ? item : el)
    await storage.save(StorageKey.LEUKOCYTES, items)

    return items
  })


