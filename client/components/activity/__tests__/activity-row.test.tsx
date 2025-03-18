import { render, screen } from "@testing-library/react";
import { ActivityRowProps } from "@/lib/types";
import { differenceInMinutes, format } from "date-fns";
import { ActivityRow } from "../activity-row";

describe("ActivityRow Component", () => {
  const log: ActivityRowProps["log"] = {
    id: "1",
    type: "click",
    description: "User clicked a button",
    userId: "user123",
    timestamp: new Date().toISOString(),
  };

  test("renders activity details correctly", () => {
    render(<ActivityRow log={log} />);

    // Check if the description is rendered
    expect(screen.getByText(log.description)).toBeInTheDocument();

    // Check if the user ID is rendered
    expect(screen.getByText(log.userId)).toBeInTheDocument();

    // Check if the badge is present (Badge component should contain "Click")
    expect(screen.getByText("Click")).toBeInTheDocument();

    // Check if the icon is rendered (Using role `img` since lucide-react icons render as SVGs)
    expect(screen.getByTestId(`click`)).toBeInTheDocument();

    // Check if timestamp is formatted correctly
    const formattedTime = format(new Date(log.timestamp), "h:mm:ss a, MMM d");
    expect(screen.getByText(formattedTime)).toBeInTheDocument();
  });

  test("adds animation class when activity is new", () => {
    const recentLog = { ...log, timestamp: new Date().toISOString() };
    render(<ActivityRow log={recentLog} />);

    const rowElement = screen.getByLabelText(
      `Activity: ${recentLog.type} by user ${recentLog.userId} at ${format(
        new Date(recentLog.timestamp),
        "h:mm:ss a, MMM d"
      )}`
    );

    const isNew = differenceInMinutes(new Date(), new Date(recentLog.timestamp)) < 1;
    if (isNew) {
      expect(rowElement).toHaveClass("animate-pulse-subtle");
    } else {
      expect(rowElement).not.toHaveClass("animate-pulse-subtle");
    }
  });

  test("sets correct aria-label on time element", () => {
    render(<ActivityRow log={log} />);
    const formattedTime = format(new Date(log.timestamp), "h:mm:ss a, MMM d");

    expect(
      screen.getByLabelText(`Activity occurred at ${formattedTime}`)
    ).toBeInTheDocument();
  });
});
