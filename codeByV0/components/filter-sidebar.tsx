"use client"

import { useDispatch, useSelector } from "react-redux"
import { setTimeRange, setActivityType, selectFilters } from "@/lib/features/filtersSlice"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export function FilterSidebar() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)

  const handleTimeRangeChange = (value: string) => {
    dispatch(setTimeRange(value))
  }

  const handleActivityTypeChange = (type: string, checked: boolean) => {
    const currentTypes = [...filters.activityTypes]

    if (checked && !currentTypes.includes(type)) {
      dispatch(setActivityType([...currentTypes, type]))
    } else if (!checked && currentTypes.includes(type)) {
      dispatch(setActivityType(currentTypes.filter((t) => t !== type)))
    }
  }

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div>
        <h3 className="mb-3 text-sm font-medium">Time Range</h3>
        <RadioGroup value={filters.timeRange} onValueChange={handleTimeRangeChange} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1h" id="r1" />
            <Label htmlFor="r1">Last hour</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="24h" id="r2" />
            <Label htmlFor="r2">Last 24 hours</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="7d" id="r3" />
            <Label htmlFor="r3">Last 7 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="30d" id="r4" />
            <Label htmlFor="r4">Last 30 days</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Activity Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pageview"
              checked={filters.activityTypes.includes("pageview")}
              onCheckedChange={(checked) => handleActivityTypeChange("pageview", checked as boolean)}
            />
            <Label htmlFor="pageview">Page Views</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="click"
              checked={filters.activityTypes.includes("click")}
              onCheckedChange={(checked) => handleActivityTypeChange("click", checked as boolean)}
            />
            <Label htmlFor="click">Clicks</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="session"
              checked={filters.activityTypes.includes("session")}
              onCheckedChange={(checked) => handleActivityTypeChange("session", checked as boolean)}
            />
            <Label htmlFor="session">Sessions</Label>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-auto"
        onClick={() => {
          dispatch(setTimeRange("24h"))
          dispatch(setActivityType(["pageview", "click", "session"]))
        }}
      >
        Reset Filters
      </Button>
    </div>
  )
}

