
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useMemo } from 'react';
import { fetchActivityLogs } from './features/userActivity';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Enhanced selector hook with better type safety
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Memoized dispatch hook for better performance
export const useMemoizedDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(() => dispatch, [dispatch]);
};

// Type-safe dispatch hook for thunks with arguments
export const useThunkDispatch = () => {
  const dispatch = useAppDispatch();
  return {
    dispatch,
    // Example typed thunk dispatch helpers with actual implementation
    fetchData: () => dispatch(fetchActivityLogs()),
  };
};
