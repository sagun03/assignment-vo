
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectTheme, setTheme, toggleTheme } from "@/lib/features/uiSlice";

export const useTheme = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Store in localStorage for persistence
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setCurrentTheme = (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));
  };

  const toggleCurrentTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    theme,
    setTheme: setCurrentTheme,
    toggleTheme: toggleCurrentTheme,
    isDarkTheme: theme === 'dark'
  };
}
