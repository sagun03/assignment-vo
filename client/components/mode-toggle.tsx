"use client"

import { useDispatch, useSelector } from "react-redux"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toggleTheme, selectTheme } from "@/lib/features/uiSlice"

export const ModeToggle = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  return (
    <Button variant="outline" size="icon" data-testid="mode-toggle-button" onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

