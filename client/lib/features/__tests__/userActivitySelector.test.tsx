import { RootState } from "../../store";
import { ActivityType } from "../../types";
import {
  selectAllLogs,
  selectFilteredLogs,
  selectLogById,
  selectLogCountsByType,
  selectLogsByUserId,
  selectLogsByType,
  selectLogsByTimeRange,
} from "../userActivity/userActivitySelector";

describe("userActivitySelectors", () => {
  let mockState: RootState;

  beforeEach(() => {
    mockState = {
      activity: {
        entities: {
          "1": { id: "1", userId: "user1", type: "click", timestamp: "2024-03-18T10:00:00Z", description: "Clicked a button" },
          "2": { id: "2", userId: "user2", type: "pageView", timestamp: "2024-03-18T11:00:00Z", description: "Visited home page" },
          "3": { id: "3", userId: "user1", type: "error", timestamp: "2024-03-18T12:00:00Z", description: "API request failed" },
        },
        ids: ["1", "2", "3"],
        filters: { types: [], timeRange: { start: null, end: null }, search: "" },
        status: "idle",
        error: null,
      },
    } as unknown as RootState; // Casting since our mock state doesn't match exact store setup
  });

  test("selectAllLogs should return all logs", () => {
    const logs = selectAllLogs(mockState);
    expect(logs).toHaveLength(3);
  });

  test("selectFilteredLogs should filter logs by type", () => {
    mockState.activity.filters.types = ["click"];
    const logs = selectFilteredLogs(mockState);
    expect(logs).toHaveLength(1);
    expect(logs[0].type).toBe("click");
  });

  test("selectFilteredLogs should filter logs by time range", () => {
    mockState.activity.filters.timeRange.start = "2024-03-18T11:00:00Z";
    mockState.activity.filters.timeRange.end = "2024-03-18T12:00:00Z";
    const logs = selectFilteredLogs(mockState);
    expect(logs).toHaveLength(2);
  });

  test("selectFilteredLogs should filter logs by search term", () => {
    mockState.activity.filters.search = "home";
    const logs = selectFilteredLogs(mockState);
    expect(logs).toHaveLength(1);
    expect(logs[0].description).toContain("home");
  });

  test("selectLogById should return log with given ID", () => {
    const log = selectLogById("1")(mockState);
    expect(log).toBeDefined();
    expect(log?.id).toBe("1");
  });

  test("selectLogCountsByType should count logs by type", () => {
    const counts = selectLogCountsByType(mockState);
    expect(counts.click).toBe(1);
    expect(counts.pageView).toBe(1);
    expect(counts.error).toBe(1);
  });

  test("selectLogsByUserId should return logs for a specific user", () => {
    const logs = selectLogsByUserId("user1")(mockState);
    expect(logs).toHaveLength(2);
    expect(logs.every(log => log.userId === "user1")).toBeTruthy();
  });

  test("selectLogsByType should return logs for a given activity type", () => {
    const logs = selectLogsByType("click" as ActivityType)(mockState);
    expect(logs).toHaveLength(1);
    expect(logs[0].type).toBe("click");
  });

  test("selectLogsByTimeRange should return logs within a specific time range", () => {
    const logs = selectLogsByTimeRange("2024-03-18T11:00:00Z", "2024-03-18T12:00:00Z")(mockState);
    expect(logs).toHaveLength(2);
  });
});
