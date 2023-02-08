import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { uploadFile } from "./action"


type State = {
  dataStatus: DataStatus;
  error: any
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(uploadFile.pending, (state) => {
    state.dataStatus = DataStatus.PENDING
  })
  builder.addCase(uploadFile.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
  })
})

export { reducer }
