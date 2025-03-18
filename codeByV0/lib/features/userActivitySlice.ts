import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import type { UserActivity } from "@/lib/types"
import { subHours, subDays } from "date-fns"

interface UserActivityState {
  activities: UserActivity[]
  loading: boolean
  error: string | null
}

const initialState: UserActivityState = {
  activities: [],
  loading: false,
  error: null,
}

export const fetchUserActivity = createAsyncThunk("userActivity/fetchUserActivity", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:9004/api/activity")
    if (!response.ok) {
      throw new Error("Failed to fetch user activity")
    }
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

const userActivitySlice = createSlice({
  name: "userActivity",
  initialState,
  reducers: {
    addActivity: (state, action) => {
      state.activities.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserActivity.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserActivity.fulfilled, (state, action) => {
        state.loading = false
        state.activities = action.payload
      })
      .addCase(fetchUserActivity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { addActivity } = userActivitySlice.actions

// Selectors
export const selectActivities = (state: RootState) => state.userActivity.activities
export const selectUiState = (state: RootState) => ({
  loading: state.userActivity.loading,
  error: state.userActivity.error,
})

// Memoized selector for filtered activities
export const selectFilteredActivities = createSelector(
  [selectActivities, (state: RootState) => state.filters.timeRange, (state: RootState) => state.filters.activityTypes],
  (activities, timeRange, activityTypes) => {
    let filteredByTime = activities

    // Filter by time range
    const now = new Date()
    if (timeRange === "1h") {
      const oneHourAgo = subHours(now, 1)
      filteredByTime = activities.filter((activity) => new Date(activity.timestamp) >= oneHourAgo)
    } else if (timeRange === "24h") {
      const oneDayAgo = subHours(now, 24)
      filteredByTime = activities.filter((activity) => new Date(activity.timestamp) >= oneDayAgo)
    } else if (timeRange === "7d") {
      const sevenDaysAgo = subDays(now, 7)
      filteredByTime = activities.filter((activity) => new Date(activity.timestamp) >= sevenDaysAgo)
    } else if (timeRange === "30d") {
      const thirtyDaysAgo = subDays(now, 30)
      filteredByTime = activities.filter((activity) => new Date(activity.timestamp) >= thirtyDaysAgo)
    }

    // Filter by activity type
    if (activityTypes.length > 0) {
      return filteredByTime.filter((activity) => activityTypes.includes(activity.type))
    }

    return filteredByTime
  },
)

export default userActivitySlice.reducer

