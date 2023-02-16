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

const saveGorayevItems = createAsyncThunk<any, number, AsyncThunkConfig>(ActionType.SAVE_ITEMS,
  async (payload, { extra, getState }) => {

    let items = getState().AppReducer.gorayevItems

    const { storage } = extra
    if (payload === 0) {
      items = generateEmptyItems(20)
    }
    await storage.save(StorageKey.GORAYEV_ITEMS, items)

    return items
  })

const updateGorayevItems = createAsyncThunk<any, number, AsyncThunkConfig>(ActionType.SAVE_ITEMS,
  async (pairs, { extra, getState }) => {
    let items = getState().AppReducer.gorayevItems

    const { storage } = extra
    if(pairs*2 > items.length){
      const itemsNew = generateEmptyItems(pairs*2-items.length, (items.length/2)+1)
      items = [...items, ...itemsNew]

    }else if(pairs*2 < items.length){
        items = items.slice(0,pairs*2)
    }

    await storage.save(StorageKey.GORAYEV_ITEMS, items)

    return items
  })

const updateGorayevItem = createAsyncThunk<any, Item, AsyncThunkConfig>(ActionType.UPDATE_ITEM,
  async (item, { extra, getState }) => {

    const { storage } = extra

    let items = getState().AppReducer.gorayevItems
    items = items.map(el => el.key === item.key ? item : el)
    await storage.save(StorageKey.GORAYEV_ITEMS, items)

    return items
  })


export { loadGorayevItems, saveGorayevItems, updateGorayevItem,updateGorayevItems }
