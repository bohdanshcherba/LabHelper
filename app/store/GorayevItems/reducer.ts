import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { loadGorayevItems, saveGorayevItems, updateGorayevItem } from "./action"


type State = {
  dataStatus: DataStatus,
  gorayevItems: any,
  error: any
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  gorayevItems: [],
  error: null
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadGorayevItems.pending, (state) => {
    state.dataStatus = DataStatus.PENDING

  })
  builder.addCase(loadGorayevItems.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.gorayevItems = action.payload
  })
  builder.addCase(updateGorayevItem.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.gorayevItems = action.payload
  })
  builder.addCase(saveGorayevItems.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.gorayevItems = action.payload
  })
})

export { reducer }
