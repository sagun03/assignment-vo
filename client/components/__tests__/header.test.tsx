import { render, screen } from "@testing-library/react";
import Header from "../header";


// Mock ModeToggle to prevent rendering issues
jest.mock("@/components/mode-toggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />,
}));

describe("Header Component", () => {
  test("renders the Activity Log title", () => {
    render(<Header />);
    expect(screen.getByText("Activity Log")).toBeInTheDocument();
  });

  test("renders the ActivityIcon", () => {
    render(<Header />);
    const icon = screen.getByTestId("activity-icon");
    expect(icon).toBeInTheDocument();
  });

  test("renders the ModeToggle button", () => {
    render(<Header />);
    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
  });
});
