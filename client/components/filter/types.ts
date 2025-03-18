import { ActivityType } from "@/lib/types";


// Checkbox Props
export interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

// Input Props
export interface InputProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// Date Picker Props
export interface DatePickerProps {
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  handleTimeRangeChange: (key: string, date: Date | undefined) => void;
}

// Activity Type Filter Props
export interface ActivityTypeFilterProps {
  activityTypes: { label: string; value: ActivityType }[];
  selectedTypes: ActivityType[];
  handleTypeChange: (type: ActivityType, checked: boolean) => void;
  logCounts: Record<ActivityType, number>;
}

// Preset Filter Props
export interface PresetFilterProps {
  selectedPreset: string | undefined;
  handlePresetSelected: (preset: string) => void;
}

// ActivityFilter Props
export interface ActivityFilterProps {
  filters: {
    search: string;
    types: ActivityType[];
    preset: string;
  };
  logCounts: Record<ActivityType, number>;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  activityTypes: { label: string; value: ActivityType }[];
  handleTypeChange: (type: ActivityType, checked: boolean) => void;
  handleTimeRangeChange: (key: string, date: Date | undefined) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearFilters: () => void;
  handlePresetSelected: (preset: string) => void;
  setDateFrom: (date: Date | undefined) => void;
  setDateTo: (date: Date | undefined) => void;
}
    