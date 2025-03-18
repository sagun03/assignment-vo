
import { EntityState } from '@reduxjs/toolkit';

export type ActivityType = 'pageView' | 'click' | 'formSubmission' | 'error' | 'apiCall';

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  type: ActivityType;
  description: string;
}

export interface ActivityFilters {
  types: ActivityType[];
  timeRange: {
    start: string | undefined;
    end: string | undefined;
  };
  preset: string | undefined; 
  search: string;
}

export interface ActivityState extends EntityState<ActivityLog, string> {
  filters: ActivityFilters;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

export interface ActivityBadgeProps {
  type: ActivityType;
}

export interface ActivityIconProps {
  type: ActivityType;
  className?: string;
}

export interface ActivityRowProps {
  log: ActivityLog;
}

export interface UiState {
  theme: "light" | "dark"
}