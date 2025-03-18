export interface UserActivity {
  id: string
  userId: string
  type: "pageview" | "click" | "session"
  page: string
  timestamp: string
  sessionDuration?: number
  details?: {
    [key: string]: any
  }
}

