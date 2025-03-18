import { ActivityIconProps } from "@/lib/types";
import { 
  Monitor, 
  MousePointer, 
  FileEdit, 
  AlertTriangle, 
  Globe 
} from "lucide-react";

export const ActivityIcon = ({ type, className = "h-4 w-4" }: ActivityIconProps) => {
  switch (type) {
    case "pageView":
      return <Monitor data-testid="pageView" className={className} />;
    case "click":
      return <MousePointer data-testid="click" className={className} />;
    case "formSubmission":
      return <FileEdit data-testid="formSubmission" className={className} />;
    case "error":
      return <AlertTriangle data-testid="error" className={className} />;
    case "apiCall":
      return <Globe data-testid="apiCall" className={className} />;
    default:
      return null;
  }
};
