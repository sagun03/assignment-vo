import useActivity from "@/hooks/use-activity";
import { memo } from "react";
import { FixedSizeList as List } from "react-window";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertTriangle } from "lucide-react";
import { ActivityRow } from "./activity/activity-row";
import AutoSizer from "react-virtualized-auto-sizer";

const ActivityTable = memo(() => {
  const { logs, status, error } = useActivity();

  if (status === "loading" && logs.length === 0) {
    return (
      <Card className="p-4" aria-busy="true" aria-label="Loading activity logs" data-testid="loading-skeleton">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-4"
              aria-hidden="true"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (status === "failed") {
    return (
      <Alert variant="destructive" role="alert" aria-live="assertive">
        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || "Failed to load activity logs"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="rounded-md border h-full">
      <div className="flex items-center bg-muted/50 border-b font-medium text-sm">
        <div className="flex-1 p-3 min-w-[150px]">Type</div>
        <div className="flex-1 p-3 min-w-[150px]">Description</div>
        <div className="flex-1 p-3 min-w-[100px]">User ID</div>
        <div className="flex-1 text-right p-3 min-w-[180px]  mr-2">Time</div>
      </div>

      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={logs.length}
            itemSize={50}
            width={width}
          >
            {({ index, style }) => (
              <div key={logs[index].id} style={style}>
                <ActivityRow log={logs[index]} />
              </div>
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
});

ActivityTable.displayName = "ActivityTable";
export default ActivityTable;
