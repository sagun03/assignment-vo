import { differenceInMinutes, format } from "date-fns";
import { memo } from "react";
import { ActivityBadge } from "./activity-badge";
import { ActivityIcon } from "./activity-icon";
import { ActivityRowProps } from "@/lib/types";

export const ActivityRow = memo(({ log }: ActivityRowProps) => {
  console.log("ActivityRow", log);
  const isNew = differenceInMinutes(new Date(), new Date(log.timestamp)) < 1;
  const formattedTime = format(new Date(log.timestamp), "h:mm:ss a, MMM d");

  return (
    <div
      key={log.id}
      className={`flex items-center border-b text-sm ${
        isNew ? "animate-pulse-subtle" : ""
      }`}
      aria-label={`Activity: ${log.type} by user ${log.userId} at ${formattedTime}`}
    >
      <div className="flex-1 p-3 min-w-[150px] font-medium">
        <div className="flex items-center gap-2">
          <ActivityBadge type={log.type} />
        </div>
      </div>
      <div className="flex-1 p-3 min-w-[150px]">
        <div className="flex items-center gap-2">
          <ActivityIcon type={log.type} aria-hidden="true" />
          <span>{log.description}</span>
        </div>
      </div>
      <div className="flex-1 p-3 min-w-[100px]">{log.userId}</div>
      <div className="flex-1 text-right p-3 min-w-[180px] mr-2">
        <time dateTime={log.timestamp} aria-label={`Activity occurred at ${formattedTime}`}>
          {formattedTime}
        </time>
      </div>
    </div>
  );
});

ActivityRow.displayName = "ActivityRow";
