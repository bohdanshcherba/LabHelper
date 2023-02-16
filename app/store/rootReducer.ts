import { combineReducers } from "@reduxjs/toolkit"
import { reducer as AppReducer } from "./GorayevItems/reducer"
import { reducer as LeukocytesReducer } from "./LeukocytesBlocks/reducer"
import { reducer as DefaultAppReducer } from "./app/reducer"


export const rootReducer = combineReducers({
  AppReducer,
  LeukocytesReducer,
  DefaultAppReducer
})
