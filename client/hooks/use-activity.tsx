"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  type ActivityType,
  fetchActivityLogs,
  startSocketConnection,
  disconnectSocket,
  selectFilteredLogs,
  selectActivityStatus,
  selectActivityError,
  selectLogCountsByType,
  selectFilters,
  setTypeFilters,
  setTimeRange,
  setSearchTerm,
  clearFilters,
  setPreset,
} from "@/lib/features/userActivity";

const useActivity = () => {
  const dispatch = useAppDispatch();
  const logs = useAppSelector(selectFilteredLogs);
  const status = useAppSelector(selectActivityStatus);
  const error = useAppSelector(selectActivityError);
  const logCounts = useAppSelector(selectLogCountsByType);
  const filters = useAppSelector(selectFilters);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);

  // Fetch initial logs
  useEffect(() => {
    dispatch(fetchActivityLogs());
    dispatch(startSocketConnection());

    return () => disconnectSocket();
  }, [dispatch]);

  // Filter management functions
  const updateTypeFilters = (types: ActivityType[]) => {
    dispatch(setTypeFilters(types));
  };

  const updateTimeRange = (start: string | undefined, end: string | undefined) => {
    dispatch(setTimeRange({ start, end }));
  };

  const updateSearchTerm = (search: string) => {
    dispatch(setSearchTerm(search));
  };

  const updatePreset = (preset: string | undefined) => {
    dispatch(setPreset(preset));
  }

  const resetFilters = () => {
    dispatch(clearFilters());
  };

  const toggleRealtimeUpdates = (enabled: boolean) => {
    setRealtimeEnabled(enabled);
  };

  return {
    logs,
    status,
    error,
    filters,
    logCounts,
    realtimeEnabled,
    updateTypeFilters,
    updateTimeRange,
    updateSearchTerm,
    resetFilters,
    toggleRealtimeUpdates,
    updatePreset
  };
}

export default useActivity;