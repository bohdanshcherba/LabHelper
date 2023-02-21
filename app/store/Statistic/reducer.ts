import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { addEntre, deleteEntre, loadEntries } from "./action"

import { EntreType } from "../../common/types/Entre.type"


type State = {
  dataStatus: DataStatus,
  entries: Array<EntreType>
}

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  entries: []
}

const reducer = createReducer(initialState, (builder) => {

  builder.addCase(loadEntries.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.entries = action.payload
  })
  builder.addCase(addEntre.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.entries = action.payload
  })
  builder.addCase(deleteEntre.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.entries = action.payload
  })

})

export { reducer }
