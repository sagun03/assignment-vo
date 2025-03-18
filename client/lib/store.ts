import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "./features/uiSlice"
import userActivityReducer from './features/userActivity';

export const store = configureStore({
  reducer: {
    activity: userActivityReducer,
    ui: uiReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

