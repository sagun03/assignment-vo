import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { DatePickerProps } from "./types";
import { cn } from "@/lib/utils";

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  date,
  setDate,
  handleTimeRangeChange,
}) => (
  <div>
    <label className="text-xs">{label}</label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {date ? format(date, "PP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            if (selectedDate) {
              handleTimeRangeChange(label.toLowerCase(), selectedDate);
            }
          }}
          initialFocus
          className="p-3"
        />
      </PopoverContent>
    </Popover>
  </div>
);

export default DatePicker;
