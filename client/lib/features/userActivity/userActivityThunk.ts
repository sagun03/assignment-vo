import { createAsyncThunk } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { activityUpdate } from "./userActivitySlice";
import { ActivityLog } from "../../types";
import { ACTIVITY_URL, SERVER_URL, SOCKET_NAMESPACE } from "../../consts";

// Initialize the socket connection (only once and reuse it)
let socket: Socket | undefined = undefined;

const initializeSocket = () => {
  if (!socket) {
    socket = io(SERVER_URL + SOCKET_NAMESPACE);
  }
  return socket;
};

// Thunk to fetch activities from the backend API
export const fetchActivityLogs = createAsyncThunk(
  '/activity/fetchActivityLogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(SERVER_URL + ACTIVITY_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      const data = await response.json();
      return data;
    } catch (error: Error | any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for handling socket real-time updates
export const startSocketConnection = createAsyncThunk(
  '/activity/startSocketConnection',
  async (_, { dispatch }) => {
    // Initialize the socket connection if not already done
    const socket = initializeSocket();

    return new Promise<void>((resolve, reject) => {
      if (!socket) {
        return reject(new Error("Socket connection failed to initialize"));
      }

      // Listen for the 'activityUpdate' event and dispatch action to update the state
      socket.on('activityUpdate', (newActivity: ActivityLog) => {
        dispatch(activityUpdate(newActivity));
      });

      socket.on('connect', () => {
        console.log('Connected to socket server');
        resolve();
      });

      // Handle socket connection error
      socket.on('connect_error', (error: Error) => {
        console.error('Socket connection error:', error);
        reject(error);
      });
    });
  }
);

// Cleanup function to disconnect the socket (optional, based on your app lifecycle)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = undefined; 
  }
};
