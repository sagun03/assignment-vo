import { configureStore } from "@reduxjs/toolkit";
import activityReducer, {
  setActivities,
  setLoading,
  setError,
  setTypeFilters,
  setTimeRange,
  setSearchTerm,
  clearFilters,
  setPreset,
} from "../userActivity/userActivitySlice";
import { ActivityLog } from "../../types";
import { fetchActivityLogs, startSocketConnection } from "../userActivity/userActivityThunk";

// Define RootState type
const store = configureStore({
  reducer: { activity: activityReducer },
});

type RootState = ReturnType<typeof store.getState>;

const mockActivities: ActivityLog[] = [
  { id: "12", userId: "1", type: "click", timestamp: "2024-03-18T10:00:00Z", description: "Clicked on Home" },
  { id: "23", userId: "2", type: "pageView", timestamp: "2024-03-18T11:00:00Z", description: "Viewed Profile" },
];

describe("activitySlice reducers and actions", () => {
  let testStore: typeof store;

  beforeEach(() => {
    testStore = configureStore({ reducer: { activity: activityReducer } });
  });

  test("should handle initial state", () => {
    expect((testStore.getState() as RootState).activity).toMatchObject({
      filters: expect.any(Object),
      status: "idle",
      error: undefined,
    });
  });

  test("should handle setActivities", () => {
    testStore.dispatch(setActivities(mockActivities));
    expect(Object.keys((testStore.getState() as RootState).activity.entities)).toHaveLength(2);
  });

  test("should handle setLoading", () => {
    testStore.dispatch(setLoading(true));
    expect((testStore.getState() as RootState).activity.status).toBe("loading");
  });

  test("should handle setError", () => {
    testStore.dispatch(setError("Network Error"));
    expect((testStore.getState() as RootState).activity.error).toBe("Network Error");
  });

  test("should handle setTypeFilters", () => {
    testStore.dispatch(setTypeFilters(["click"]));
    expect((testStore.getState() as RootState).activity.filters.types).toEqual(["click"]);
  });

  test("should handle setTimeRange", () => {
    const timeRange = { start: "2024-03-18T10:00:00Z", end: "2024-03-18T12:00:00Z" };
    testStore.dispatch(setTimeRange(timeRange));
    expect((testStore.getState() as RootState).activity.filters.timeRange).toEqual(timeRange);
  });

  test("should handle setSearchTerm", () => {
    testStore.dispatch(setSearchTerm("home"));
    expect((testStore.getState() as RootState).activity.filters.search).toBe("home");
  });

  test("should handle clearFilters", () => {
    testStore.dispatch(clearFilters());
    expect((testStore.getState() as RootState).activity.filters).toEqual({
      types: [],
      timeRange: { start: undefined, end: undefined },
      preset: undefined,
      search: "",
    });
  });

  test("should handle setPreset", () => {
    testStore.dispatch(setPreset("last24Hours"));
    expect((testStore.getState() as RootState).activity.filters.preset).toBe("last24Hours");
  });
});

describe("activitySlice extra reducers", () => {
  let testStore: typeof store;

  beforeEach(() => {
    testStore = configureStore({ reducer: { activity: activityReducer } });
  });

  test("should handle fetchActivityLogs.pending", () => {
    testStore.dispatch({ type: fetchActivityLogs.pending.type });
    expect((testStore.getState() as RootState).activity.status).toBe("loading");
  });

  test("should handle fetchActivityLogs.fulfilled", () => {
    testStore.dispatch({ type: fetchActivityLogs.fulfilled.type, payload: mockActivities });
    expect((testStore.getState() as RootState).activity.status).toBe("succeeded");
    expect(Object.keys((testStore.getState() as RootState).activity.entities)).toHaveLength(2);
  });

  test("should handle fetchActivityLogs.rejected", () => {
    testStore.dispatch({ type: fetchActivityLogs.rejected.type, payload: "Server Error" });
    expect((testStore.getState() as RootState).activity.status).toBe("failed");
    expect((testStore.getState() as RootState).activity.error).toBe("Server Error");
  });

  test("should handle startSocketConnection.fulfilled", () => {
    testStore.dispatch({ type: startSocketConnection.fulfilled.type });
    expect((testStore.getState() as RootState).activity.status).toBe("succeeded");
  });

  test("should handle startSocketConnection.rejected", () => {
    testStore.dispatch({ type: startSocketConnection.rejected.type, error: { message: "Socket Failed" } });
    expect((testStore.getState() as RootState).activity.status).toBe("failed");
    expect((testStore.getState() as RootState).activity.error).toBe("Socket Failed");
  });
});
