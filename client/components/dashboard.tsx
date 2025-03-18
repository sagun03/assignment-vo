"use client";

import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("../components/header"));
const ActivityTable = lazy(() => import("../components/activity-table"));
const ActivityFilter = lazy(() => import("./activity-filter"));

const Dashboard = () => {
  return (
    <div className="flex flex-col bg-background dark:bg-black text-foreground">
      <Header />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2 text-sm text-muted-foreground">
              Loading...
            </span>
          </div>
        }
      >
        <div className="flex flex-col md:flex-row flex-1 gap-5 justify-center p-4 md:p-6 min-h-[calc(100vh-68px)]">
          <div className="w-full md:w-[350px] md:sticky md:min-h-[calc(100vh-120px)]">
            <ActivityFilter />
          </div>

          {/* Main Content */}
          <main className="flex flex-col gap-6 md:px-8 flex-1">
            <div className="space-y-6 w-full h-full overflow-hidden">
              <ActivityTable />
            </div>
          </main>
        </div>
      </Suspense>
    </div>
  );
};

export default Dashboard;
