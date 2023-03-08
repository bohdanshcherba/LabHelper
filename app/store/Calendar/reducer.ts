import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { isMarkDay, markDay } from "./action"

import { EntreType } from "../../common/types/Entre.type"


type State = {
  dataStatus: DataStatus,
  calendar: any
  day: any
}

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  calendar: {
    "3/31/2023": {
      customStyles: {
        container: {
          backgroundColor: "green"
        },
      }
    }
  },
  day: false
}

const reducer = createReducer(initialState, (builder) => {

  builder.addCase(markDay.fulfilled, (state, action) => {

    state.calendar = action.payload
  })
 builder.addCase(isMarkDay.fulfilled, (state, action) => {

    state.day = action.payload
  })


})

export { reducer }
