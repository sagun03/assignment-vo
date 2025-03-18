import { render, screen } from "@testing-library/react";
import ActivityTable from "@/components/activity-table";
import "@testing-library/jest-dom";
import useActivity from "@/hooks/use-activity";

// Mock the `useActivity` hook
jest.mock("@/hooks/use-activity");

// Mock `react-virtualized-auto-sizer` since it doesn't work well in test environments
jest.mock("react-virtualized-auto-sizer", () => ({
  __esModule: true,
  default: ({ children }: any) => children({ height: 500, width: 500 }),
}));

describe("ActivityTable Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading skeleton when data is loading", () => {
    (useActivity as jest.Mock).mockReturnValue({
      logs: [],
      status: "loading",
      error: null,
    });
  
    render(<ActivityTable />);
  
    expect(screen.getByLabelText("Loading activity logs")).toBeInTheDocument();
    expect(screen.getAllByTestId("loading-skeleton").length).toBeGreaterThan(0); 
  });

  test("displays error message when request fails", () => {
    (useActivity as jest.Mock).mockReturnValue({
      logs: [],
      status: "failed",
      error: "Network Error",
    });

    render(<ActivityTable />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Network Error")).toBeInTheDocument();
  });

  test("renders activity logs when data is successfully loaded", () => {
    (useActivity as jest.Mock).mockReturnValue({
      logs: [
        { id: "1", type: "pageView", description: "User logged in", userId: "123", timestamp: new Date().toISOString(),  },
        { id: "2", type: "click", description: "User logged out", userId: "456", timestamp: new Date().toISOString(),  },
      ],
      status: "success",
      error: null,
    });

    render(<ActivityTable />);

    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("User ID")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();

    expect(screen.getByText("Page View")).toBeInTheDocument();
    expect(screen.getByText("User logged in")).toBeInTheDocument();

    expect(screen.getByText("Click")).toBeInTheDocument();
    expect(screen.getByText("User logged out")).toBeInTheDocument();
  });
});
