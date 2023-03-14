import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import {
  getMarkingMode,
  isMarkDay,
  loadCalendar,
  markDay, saveMarkedDays,
  setIsMarkingMode,
  setMarkColor,
  setSelectedDay
} from "./action"

import { EntreType } from "../../common/types/Entre.type"


type State = {
  dataStatus: DataStatus,
  calendar: any
  day: any
  isMarkingMode
  selectedDay: {
    date: string,
    dayInfo: EntreType | undefined
  } | null
  markingColor: { name: string, color: string }

}

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  calendar: {
    "2023-03-04": { color: "#fff", name: "" }
  },
  day: false,
  isMarkingMode: false,
  selectedDay: null,
  markingColor: { color: "#fff", name: "" }
}

const reducer = createReducer(initialState, (builder) => {

  builder.addCase(markDay.fulfilled, (state, action) => {

    state.calendar = action.payload
  })
  builder.addCase(isMarkDay.fulfilled, (state, action) => {

    state.day = action.payload
  })
  builder.addCase(setIsMarkingMode.fulfilled, (state, action) => {

    state.isMarkingMode = action.payload
  })
  builder.addCase(getMarkingMode.fulfilled, (state, action) => {

    state.isMarkingMode = action.payload
  })
  builder.addCase(setSelectedDay.pending, (state, action) => {

  })
  builder.addCase(setSelectedDay.fulfilled, (state, action) => {
    state.selectedDay = action.payload
  })
  builder.addCase(setMarkColor.fulfilled, (state, action) => {
    state.markingColor = action.payload
  })
  builder.addCase(saveMarkedDays.fulfilled, (state, action) => {
    state.calendar = action.payload
  })
  builder.addCase(loadCalendar.fulfilled, (state, action) => {
    state.selectedDay = action.payload.selectedDay
    state.calendar = action.payload.markedDays
  })
})

export { reducer }
