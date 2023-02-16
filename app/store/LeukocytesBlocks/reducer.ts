import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { loadLeukocytesBlocks, saveLeukocytesBlocks, updateLeukocytesBlocks, updateLeukocytesBlock } from "./action"
import { LeukocytesBlockType } from "../../common/types/Leukocytes.type"
import { saveGorayevItems } from "../GorayevItems/action"


type State = {
  dataStatus: DataStatus,
  leukocytesBlocks: Array<LeukocytesBlockType> ,
  error: any
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  leukocytesBlocks: [],
  error: null
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadLeukocytesBlocks.pending, (state) => {
    state.dataStatus = DataStatus.PENDING

  })
  builder.addCase(loadLeukocytesBlocks.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.leukocytesBlocks = action.payload
  })
  builder.addCase(updateLeukocytesBlock.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.leukocytesBlocks = action.payload
  })
  builder.addCase(saveLeukocytesBlocks.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.leukocytesBlocks = action.payload
  })
})

export { reducer }
