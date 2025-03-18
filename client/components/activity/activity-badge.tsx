import { Badge } from "@/components/ui/badge";
import { ActivityBadgeProps } from "@/lib/types";

export const ActivityBadge = ({ type }: ActivityBadgeProps) => {
  switch (type) {
    case "pageView":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          data-testid="badge-pageView"
        >
          Page View
        </Badge>
      );
    case "click":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          data-testid="badge-click"
        >
          Click
        </Badge>
      );
    case "formSubmission":
      return (
        <Badge
          variant="outline"
          className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
          data-testid="badge-formSubmission"
        >
          Form
        </Badge>
      );
    case "error":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
          data-testid="badge-error"
        >
          Error
        </Badge>
      );
    case "apiCall":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
          data-testid="badge-apiCall"
        >
          API
        </Badge>
      );
    default:
      return null;
  }
};
