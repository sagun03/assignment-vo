export type ActivityType = 'pageView' | 'click' | 'formSubmission' | 'error' | 'apiCall';

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  type: ActivityType;
  description: string;
}