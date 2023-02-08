import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"


const uploadFile = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.FILE_UPLOAD,
  async (payload, { extra }) => {
    return null
  })

export { uploadFile }
