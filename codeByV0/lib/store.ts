import { configureStore } from "@reduxjs/toolkit"
import userActivityReducer from "./features/userActivitySlice"
import uiReducer from "./features/uiSlice"
import filtersReducer from "./features/filtersSlice"

export const store = configureStore({
  reducer: {
    userActivity: userActivityReducer,
    ui: uiReducer,
    filters: filtersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

