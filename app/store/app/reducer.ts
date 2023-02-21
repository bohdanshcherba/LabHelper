import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { addFiles, loadCalculatorValue, loadFiles, saveCalculatorValue } from "./action"
import { FileType } from "../../common/types/File.type"


type State = {
  dataStatus: DataStatus,
  calculatorValue: string,
  files: Array<FileType>
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  calculatorValue: "",
  files: [],
}

const reducer = createReducer(initialState, (builder) => {

  builder.addCase(loadCalculatorValue.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.calculatorValue = action.payload
  })
  builder.addCase(saveCalculatorValue.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.calculatorValue = action.payload
  })
  builder.addCase(loadFiles.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.files = action.payload
  })
  builder.addCase(addFiles.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED

    state.files = action.payload
  })
})

export { reducer }
