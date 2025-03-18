import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ActivityLog, ActivityState } from "../../types";
import { fetchActivityLogs, startSocketConnection } from "./userActivityThunk";

// Create the entity adapter
export const activityAdapter = createEntityAdapter<ActivityLog>({
  // Sort by timestamp (most recent first)
  sortComparer: (a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
});

// Define initial state with filters, status, and error
const initialState = activityAdapter.getInitialState<
  Omit<ActivityState, keyof ReturnType<typeof activityAdapter.getInitialState>>
>({
  filters: {
    types: [],
    timeRange: {
      start: undefined,
      end: undefined,
    },
    preset: undefined,
    search: "",
  },
  status: "idle",
  error: undefined,
});

// Redux slice
const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    // Store real-time activity update in the state
    activityUpdate: (state, action: PayloadAction<ActivityLog>) => {
      activityAdapter.addOne(state, action.payload);
    },

    // Set activities (useful for bulk actions)
    setActivities: (state, action: PayloadAction<ActivityLog[]>) => {
      activityAdapter.setAll(state, action.payload);
    },

    // Set filters
    setTypeFilters: (
      state,
      action: PayloadAction<ActivityState["filters"]["types"]>
    ) => {
      state.filters.types = action.payload;
    },
    setPreset: (state, action: PayloadAction<ActivityState["filters"]["preset"]>) => {
      state.filters.preset = action.payload;
    },
    setTimeRange: (
      state,
      action: PayloadAction<ActivityState["filters"]["timeRange"]>
    ) => {
      state.filters.timeRange = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        types: [],
        timeRange: {
          start: undefined,
          end: undefined,
        },
        preset: undefined,
        search: "",
      };
    },

    // Set loading and error state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload ? "loading" : "idle";
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling the fetch activities action
      .addCase(fetchActivityLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActivityLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        activityAdapter.setAll(state, action.payload); // Update with fetched activities
        state.error = undefined; // Reset error on success
      })
      .addCase(fetchActivityLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Store the error message
      })
      // Handle real-time updates (e.g., via WebSocket or other mechanism)
      .addCase(startSocketConnection.fulfilled, (state) => {
        state.status = "succeeded"; // Update state if the socket connection is successful
      })
      .addCase(startSocketConnection.rejected, (state, action) => {
        state.status = "failed"; // Update state if there was an error with the connection
        state.error = action.error.message; // Set error message
      });
  },
});

// Export actions
export const {
  activityUpdate,
  setActivities,
  setLoading,
  setError,
  setTypeFilters,
  setTimeRange,
  setSearchTerm,
  clearFilters,
  setPreset
} = activitySlice.actions;

export default activitySlice.reducer;
