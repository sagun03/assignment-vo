"use client";

import { useState, useCallback, useMemo } from "react";
import useActivity from "./use-activity";
import { ActivityType } from "@/lib/types";

const useActivityFilters = () => {
  const {
    filters,
    logCounts,
    updateTypeFilters,
    updateTimeRange,
    updateSearchTerm,
    updatePreset,
  } = useActivity();

  const [dateFrom, setDateFrom] = useState<Date |  undefined>(
    filters.timeRange.start ? new Date(filters.timeRange.start) : undefined
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(
    filters.timeRange.end ? new Date(filters.timeRange.end) : undefined
  );

  const activityTypes: { label: string; value: ActivityType }[] = useMemo(
    () => [
      { label: "Page View", value: "pageView" },
      { label: "Click", value: "click" },
      { label: "Form Submission", value: "formSubmission" },
      { label: "Error", value: "error" },
      { label: "API Call", value: "apiCall" },
    ],
    []
  );

  const handleTypeChange = useCallback(
    (type: ActivityType, checked: boolean) => {
      updateTypeFilters(
        checked
          ? [...filters.types, type]
          : filters.types.filter((t) => t !== type)
      );
    },
    [filters.types, updateTypeFilters]
  );

  const handleTimeRangeChange = useCallback(
    (label?: string, date?: Date) => {
      updateTimeRange(
        label === "from"
          ? date?.toISOString()
          : dateFrom
          ? dateFrom.toISOString()
          : undefined,
        label === "to"
          ? date?.toISOString()
          : dateTo
          ? dateTo.toISOString()
          : undefined
      );
    },
    [dateFrom, dateTo, updateTimeRange]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchTerm(e.target.value);
    },
    [updateSearchTerm]
  );

  const handleClearFilters = useCallback(() => {
    setDateFrom(undefined);
    setDateTo(undefined);
    updateTypeFilters([]);
    updateSearchTerm("");
    updatePreset("");
    updateTimeRange(undefined, undefined);
  }, [updateTypeFilters, updateSearchTerm, updateTimeRange, updatePreset]);

  const setPresetTimeRange = useCallback(
    (days: number) => {
      const end = new Date();
      const start = new Date();

      if (days === 0) start.setHours(0, 0, 0, 0);
      else start.setDate(start.getDate() - days);

      setDateFrom(start);
      setDateTo(end);
      updateTimeRange(start.toISOString(), end.toISOString());
    },
    [updateTimeRange]
  );

  const handlePresetSelected = useCallback(
    (preset: string) => {
      updatePreset(preset);

      const presetMap: Record<string, number> = {
        today: 0,
        yesterday: 1,
        last7days: 7,
        last30days: 30,
      };

      if (preset in presetMap) setPresetTimeRange(presetMap[preset]);
    },
    [updatePreset, setPresetTimeRange]
  );

  return {
    filters,
    logCounts,
    dateFrom,
    dateTo,
    activityTypes,
    handleTypeChange,
    handleTimeRangeChange,
    handleSearchChange,
    handleClearFilters,
    handlePresetSelected,
    setDateFrom,
    setDateTo,
  };
};

export default useActivityFilters;
