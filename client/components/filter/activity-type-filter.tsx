import { Label } from "../ui/label";
import CheckboxComponent from "./checkbox";
import { ActivityTypeFilterProps } from "./types";


const ActivityTypeFilter: React.FC<ActivityTypeFilterProps> = ({ activityTypes, selectedTypes, handleTypeChange, logCounts }) => (
  <div>
    <Label className="text-sm font-medium">Activity Types</Label>
    <div className="mt-1.5 space-y-2">
      {activityTypes.map(({ label, value }) => (
        <div key={value} className="flex items-center space-x-2">
          <CheckboxComponent
            id={`type-${value}`}
            checked={selectedTypes.includes(value)}
            onCheckedChange={(checked) => handleTypeChange(value, checked)}
          />
          <Label htmlFor={`type-${value}`} className="text-sm cursor-pointer flex-1">
            {label}
          </Label>
          <span className="text-xs text-muted-foreground">{logCounts[value] || 0}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityTypeFilter;
