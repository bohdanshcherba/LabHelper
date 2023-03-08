import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"

import { EntreType } from "../../common/types/Entre.type"


export const markDay = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.MARK_DAY,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const calendar = getState().CalendarReducer.calendar


    const copy = { ...calendar }
    copy[payload.toLocaleDateString()] = {
      customStyles: {
        container: {
          backgroundColor: "green"
        },

      }
    }

    return copy
  })
export const isMarkDay = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.IS_MARK_DAY,
  async (payload, { extra, getState }) => {
    const { storage } = extra
    const calendar = getState().CalendarReducer.calendar

    return payload.toLocaleDateString() in calendar
  })

