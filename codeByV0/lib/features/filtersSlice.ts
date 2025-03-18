import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"

interface FiltersState {
  timeRange: string
  activityTypes: string[]
}

const initialState: FiltersState = {
  timeRange: "24h",
  activityTypes: ["pageview", "click", "session"],
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.timeRange = action.payload
    },
    setActivityType: (state, action: PayloadAction<string[]>) => {
      state.activityTypes = action.payload
    },
  },
})

export const { setTimeRange, setActivityType } = filtersSlice.actions

export const selectFilters = (state: RootState) => state.filters

export default filtersSlice.reducer

