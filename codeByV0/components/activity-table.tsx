"use client"

import { formatDistanceToNow } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { UserActivity } from "@/lib/types"

interface ActivityTableProps {
  activities: UserActivity[]
}

export function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Activity Type</TableHead>
            <TableHead>Page</TableHead>
            <TableHead className="hidden md:table-cell">Session Duration</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No activities found.
              </TableCell>
            </TableRow>
          ) : (
            activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.userId}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      activity.type === "click" ? "default" : activity.type === "pageview" ? "secondary" : "outline"
                    }
                  >
                    {activity.type}
                  </Badge>
                </TableCell>
                <TableCell>{activity.page}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {activity.sessionDuration ? `${activity.sessionDuration}s` : "N/A"}
                </TableCell>
                <TableCell>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

