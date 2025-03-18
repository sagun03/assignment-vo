
import reducer, { setTypeFilters, setTimeRange, setSearchTerm, clearFilters, setPreset } from './userActivitySlice';
import { fetchActivityLogs, startSocketConnection, disconnectSocket } from './userActivityThunk';
import { 
  selectAllLogs,
  selectActivityStatus,
  selectActivityError,
  selectFilters,
  selectFilteredLogs,
  selectLogById,
  selectLogCountsByType
} from './userActivitySelector';
import type { ActivityType, ActivityLog, ActivityFilters, ActivityState } from '../../types';

export {
  // Actions
  setTypeFilters,
  setTimeRange,
  setSearchTerm,
  clearFilters,
  setPreset,
  
  // Thunks
  fetchActivityLogs,
  startSocketConnection,
  disconnectSocket,
  
  // Selectors
  selectAllLogs,
  selectActivityStatus,
  selectActivityError,
  selectFilters,
  selectFilteredLogs,
  selectLogById,
  selectLogCountsByType,
  
  // Types
  type ActivityType,
  type ActivityLog,
  type ActivityFilters,
  type ActivityState
};

export default reducer;
