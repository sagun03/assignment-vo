import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { activityAdapter } from './userActivitySlice';
import { ActivityType } from '../../types';

// Get adapter selectors
const adapterSelectors = activityAdapter.getSelectors();

// Basic selector functions
const getActivityEntities = (state: RootState) => state.activity.entities;
const getFilters = (state: RootState) => state.activity.filters;
const getStatus = (state: RootState) => state.activity.status;
const getError = (state: RootState) => state.activity.error;

// Basic selectors
export const selectAllLogs = (state: RootState) => 
  adapterSelectors.selectAll(state.activity);
  
export const selectActivityStatus = getStatus;
export const selectActivityError = getError;
export const selectFilters = getFilters;

// Advanced memoized selector to get filtered logs
export const selectFilteredLogs = createSelector(
  [selectAllLogs, getFilters],
  (logs, filters) => {
    let filtered = logs;
    
    // Filter by activity types
    if (filters.types.length > 0) {
      filtered = filtered.filter(log => filters.types.includes(log.type));
    }
    
    // Filter by time range
    if (filters.timeRange.start) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) >= new Date(filters.timeRange.start!)
      );
    }
    
    if (filters.timeRange.end) {
      filtered = filtered.filter(log => 
        new Date(log.timestamp) <= new Date(filters.timeRange.end!)
      );
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(log => 
        log.description.toLowerCase().includes(searchLower) ||
        log.userId.toLowerCase().includes(searchLower) ||
        log.type.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }
);

// Get log by ID
export const selectLogById = (id: string) => 
  createSelector(
    [getActivityEntities],
    (entities) => entities[id]
  );

// Count logs by type
export const selectLogCountsByType = createSelector(
  [selectAllLogs],
  (logs) => {
    const counts: Record<ActivityType, number> = {
      pageView: 0,
      click: 0,
      formSubmission: 0,
      error: 0,
      apiCall: 0
    };
    
    logs.forEach(log => {
      counts[log.type]++;
    });
    
    return counts;
  }
);

// Get logs by userId
export const selectLogsByUserId = (userId: string) => 
  createSelector(
    [selectAllLogs],
    (logs) => logs.filter(log => log.userId === userId)
  );

// Get logs by type
export const selectLogsByType = (type: ActivityType) => 
  createSelector(
    [selectAllLogs],
    (logs) => logs.filter(log => log.type === type)
  );

// Get logs within a specific time range
export const selectLogsByTimeRange = (start: string, end: string) => 
  createSelector(
    [selectAllLogs],
    (logs) => logs.filter(log => 
      new Date(log.timestamp) >= new Date(start) &&
      new Date(log.timestamp) <= new Date(end)
    )
  );
