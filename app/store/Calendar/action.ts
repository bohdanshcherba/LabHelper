import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig, useAppDispatch } from "../store"
import { StorageKey } from "../../common/enums/enums"

import { EntreType } from "../../common/types/Entre.type"
import { formatDateForKey, getTodayDate } from "../../utils/dateFormat"
import { loadEntries } from "../Statistic/action"

export const saveMarkedDays = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.SAVE_CALENDAR,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const calendar = getState().CalendarReducer.calendar

    await storage.save(StorageKey.MARKED_DAYS, calendar)

    return calendar
  })

export const markDay = createAsyncThunk<any, {
  date: string,
  markColor: {
    color: string,
    name: string
  } | null
}, AsyncThunkConfig>(ActionType.MARK_DAY,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const calendar = getState().CalendarReducer.calendar

    const copy = { ...calendar }
    if (payload.markColor) {
      copy[payload.date] = payload.markColor
    } else {
      delete copy[payload.date]
    }

    return copy
  })
export const isMarkDay = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.IS_MARK_DAY,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const calendar = getState().CalendarReducer.calendar


    return calendar[payload] ? calendar[payload] : null
  })

export const setIsMarkingMode = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.SET_IS_MARK,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    return payload
  })

export const setSelectedDay = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.SET_SELECTED_DAY,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const entries = getState().StatisticReducer.entries

    return {
      date: payload,
      dayInfo: entries[payload]
    }
  })
export const getMarkingMode = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.GET_MARKING_MODE,
  async (payload, { extra, getState }) => {
    const { storage } = extra

    return getState().CalendarReducer.isMarkingMode
  })
export const setMarkColor = createAsyncThunk<any, { name: string, color: string }, AsyncThunkConfig>(ActionType.SET_MARK_COLOR,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    return payload
  })

export const getMarkColor = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.GET_MARK_COLOR,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    return getState().CalendarReducer.markingColor
  })

export const loadCalendar = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_CALENDAR,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const today = getTodayDate()
    today.setHours(0, 0, 0, 0)
    const key = formatDateForKey(today)
    let entries = getState().StatisticReducer.entries
    if (Object.keys(entries).length === 0) {
      entries = await storage.load(StorageKey.ENTRIES)
    }
    const markedDays = await storage.load(StorageKey.MARKED_DAYS)

    const selectedDay = {
      date: key,
      dayInfo: entries[key]
    }
    return { selectedDay, markedDays }
  })


