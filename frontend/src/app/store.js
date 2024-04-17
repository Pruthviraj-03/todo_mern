import { configureStore } from "@reduxjs/toolkit"
import rootReducer from '../Slice/rootReducer'

const store = configureStore({
  reducer: rootReducer
})

export default store