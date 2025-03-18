import { Button } from "../ui/button";
import { Filter, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { PresetFilterProps } from "./types";

const PresetFilter: React.FC<PresetFilterProps> = ({
  selectedPreset,
  handlePresetSelected,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="h-8 text-xs">
        <Filter className="mr-2 h-3 w-3" />
        {selectedPreset || "Presets"}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48">
      {["today", "last7days", "last30days"].map((preset) => (
        <DropdownMenuItem
          key={preset}
          onClick={() => handlePresetSelected(preset)}
        >
          {selectedPreset === preset && (
            <Check className="mr-2 h-4 w-4 text-primary" />
          )}
          {preset.charAt(0).toUpperCase() + preset.slice(1)}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default PresetFilter;
