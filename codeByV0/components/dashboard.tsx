"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Bell, Filter, Menu } from "lucide-react"
import type { AppDispatch } from "@/lib/store"
import { fetchUserActivity, selectFilteredActivities, selectUiState } from "@/lib/features/userActivitySlice"
import { ActivityTable } from "@/components/activity-table"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const activities = useSelector(selectFilteredActivities)
  const { loading, error } = useSelector(selectUiState)

  useEffect(() => {
    dispatch(fetchUserActivity())

    // Set up WebSocket connection
    const ws = new WebSocket("ws://localhost:9004/activity")

    ws.onmessage = (event) => {
      const newActivity = JSON.parse(event.data)
      // In a real app, you would dispatch an action to add the new activity
      console.log("New activity received:", newActivity)
    }

    return () => {
      ws.close()
    }
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-4 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <FilterSidebar />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold">User Activity Dashboard</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[240px] flex-shrink-0 border-r bg-muted/40 md:block">
          <FilterSidebar />
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Activity Log</h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <FilterSidebar />
              </SheetContent>
            </Sheet>
          </div>

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && <ActivityTable activities={activities} />}
        </main>
      </div>
    </div>
  )
}

