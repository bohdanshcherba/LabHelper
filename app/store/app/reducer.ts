import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import { loadCalculatorValue, saveCalculatorValue } from "./action"


type State = {
  dataStatus: DataStatus,
  calculatorValue: string
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  calculatorValue: ""
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

})

export { reducer }
