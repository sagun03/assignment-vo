import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import useActivityFilters from "../hooks/use-activityFilter";
import {
  ActivityTypeFilter,
  PresetFilter,
  SearchInput,
  DatePicker,
} from "./filter";

const ActivityFilter: React.FC = () => {
  const {
    filters,
    logCounts,
    dateFrom,
    dateTo,
    activityTypes,
    handleTypeChange,
    handleTimeRangeChange,
    handleSearchChange,
    handleClearFilters,
    handlePresetSelected,
    setDateFrom,
    setDateTo,
  } = useActivityFilters();

  const isFilterApplied =
    filters.search ||
    filters.types.length > 0 ||
    filters.preset ||
    dateFrom ||
    dateTo;

  return (
    <Card className="h-full sticky top-4">
      <CardHeader className="px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg w-fit">Filters</CardTitle>
        {isFilterApplied && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="px-2 w-fit h-5"
          >
            <X className="h-2 w-4" /> <span className="ml-1">Clear</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="px-6 py-4 space-y-6">
        <SearchInput
          id="search"
          placeholder="Search activities..."
          value={filters.search}
          onChange={handleSearchChange}
        />
        <ActivityTypeFilter
          activityTypes={activityTypes}
          selectedTypes={filters.types}
          handleTypeChange={handleTypeChange}
          logCounts={logCounts}
        />
        <PresetFilter
          selectedPreset={filters.preset}
          handlePresetSelected={handlePresetSelected}
        />
        <DatePicker
          label="From"
          date={dateFrom}
          setDate={setDateFrom}
          handleTimeRangeChange={handleTimeRangeChange}
        />
        <DatePicker
          label="To"
          date={dateTo}
          setDate={setDateTo}
          handleTimeRangeChange={handleTimeRangeChange}
        />
      </CardContent>
    </Card>
  );
};

export default ActivityFilter;
