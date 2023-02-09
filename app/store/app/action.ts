import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"
import { generateEmptyItems } from "../../utils/gorayev"
import { Item } from "../../common/types/Item.type"


const loadGorayevItems = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_ITEMS,
  async (payload, { extra }) => {

    const { storage } = extra

    let items = await storage.load(StorageKey.GORAYEV_ITEMS)

    if (!items) {
      items = generateEmptyItems(20)
      await storage.save(StorageKey.GORAYEV_ITEMS, items)
    }
    return items
  })

const saveGorayevItems = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.SAVE_ITEMS,
  async (payload, { extra, getState }) => {

    const { storage } = extra

    const items = getState().AppReducer.gorayevItems
    await storage.save(StorageKey.GORAYEV_ITEMS, items)

    return items
  })

const updateGorayevItem = createAsyncThunk<any, Item, AsyncThunkConfig>(ActionType.UPDATE_ITEM,
  async (item, { extra, getState }) => {

    const { storage } = extra

    let items = getState().AppReducer.gorayevItems
    items = items.map(el=>el.key===item.key?item:el)
    await storage.save(StorageKey.GORAYEV_ITEMS, items)

    return items
  })


export { loadGorayevItems, saveGorayevItems, updateGorayevItem }
