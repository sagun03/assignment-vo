import { ActivityIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const Header = () => (
  <header className="sticky top-0 px-8 z-10 border-b bg-background">
    <div className="flex h-16 items-center px-4 md:px-6">
      <ActivityIcon data-testid="activity-icon" className="h-5 w-5 text-primary mr-4" />
      <h1 className="text-xl font-semibold">Activity Log</h1>
      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />
      </div>
    </div>
  </header>
);

export default Header;
