import { configureStore } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import activityReducer, {
} from "../userActivity/userActivitySlice";
import {
  fetchActivityLogs,
  startSocketConnection,
} from "../userActivity/userActivityThunk";
import { ACTIVITY_URL, SERVER_URL } from "../../consts";
import { ActivityLog } from "../../types";

jest.mock("socket.io-client");

// Mock activity data
const mockActivities: ActivityLog[] = [
  {
    id: "1",
    userId: "user1",
    type: "click",
    timestamp: "2024-03-18T10:00:00Z",
    description: "Clicked a button",
  },
  {
    id: "2",
    userId: "user2",
    type: "pageView",
    timestamp: "2024-03-18T11:00:00Z",
    description: "Visited home page",
  },
];

// Set up the Redux store with proper middleware
const store = configureStore({
  reducer: { activity: activityReducer },
});

describe("userActivityThunk async actions", () => {
  beforeEach(() => {
    store.dispatch({ type: "RESET" });
    jest.clearAllMocks();
  });

  test("fetchActivityLogs should fetch activities successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockActivities),
      })
    ) as jest.Mock;

    await store.dispatch(fetchActivityLogs());

    const state = store.getState().activity;
    expect(state.status).toBe("succeeded");
    expect(Object.keys(state.entities)).toHaveLength(2);
    expect(global.fetch).toHaveBeenCalledWith(`${SERVER_URL}${ACTIVITY_URL}`);
  });

  test("fetchActivityLogs should handle failure", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false })) as jest.Mock;

    await store.dispatch(fetchActivityLogs());

    const state = store.getState().activity;
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Failed to fetch activities");
  });

  test("startSocketConnection should establish a socket connection", async () => {
    const mockSocket: Partial<Socket> = {
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === "connect") callback();
        if (event === "activityUpdate") callback(mockActivities[0]);
        return mockSocket as Socket; // Ensure proper chaining
      }),
      emit: jest.fn(),
    };

    (io as jest.Mock).mockReturnValue(mockSocket);

    await store.dispatch(startSocketConnection());

    expect(mockSocket.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith(
      "activityUpdate",
      expect.any(Function)
    );
    expect(store.getState().activity.entities["1"]).toBeDefined();
    
  });
});
