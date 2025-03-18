import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import { UiState } from "../types"

// Initialize theme from localStorage if available
const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme
    }

    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
  }

  return "light"
}

const initialState: UiState = {
  theme: getInitialTheme(),
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload)

        // Update document class for theme
        if (action.payload === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light"
      state.theme = newTheme

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme)

        // Update document class for theme
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    },
  },
})

export const { setTheme, toggleTheme } = uiSlice.actions

export const selectTheme = (state: RootState) => state.ui.theme

export default uiSlice.reducer

