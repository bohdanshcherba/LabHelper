import React from "react"

import { AppNavigator } from "./navigators"
import { Provider } from "react-redux"
import store from "./store/store"
import { AppState } from "react-native"


function App(): JSX.Element {

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  )
}

export default App
