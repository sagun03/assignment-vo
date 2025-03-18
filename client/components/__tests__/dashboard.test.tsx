import { render, screen } from "@testing-library/react";
import Dashboard from "../dashboard";

jest.mock("@/components/header", () => () => <div data-testid="header" />);
jest.mock("@/components/activity-table", () => () => <div data-testid="activity-table" />);
jest.mock("@/components/activity-filter", () => () => <div data-testid="activity-filter" />);

describe("Dashboard Component", () => {
    it("renders the header component", async () => {
      render(<Dashboard />);
      expect(await screen.findByTestId("header")).toBeInTheDocument();
    });
  
    it("renders the activity filter component", async () => {
      render(<Dashboard />);
      expect(await screen.findByTestId("activity-filter")).toBeInTheDocument();
    });
  
    it("renders the activity table component", async () => {
      render(<Dashboard />);
      expect(await screen.findByTestId("activity-table")).toBeInTheDocument();
    });
  
  });
