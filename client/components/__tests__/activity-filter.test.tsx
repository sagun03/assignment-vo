import useActivityFilters from "@/hooks/use-activityFilter";
import { render, screen, fireEvent } from "@testing-library/react";
import ActivityFilter from "../activity-filter";


// Mock the `useActivityFilters` hook
jest.mock("@/hooks/use-activityFilter");

const mockUseActivityFilters = useActivityFilters as jest.Mock;

describe("ActivityFilter Component", () => {
  beforeEach(() => {
    mockUseActivityFilters.mockReturnValue({
      filters: { search: "", types: [], preset: null },
      logCounts: {},
      dateFrom: null,
      dateTo: null,
      activityTypes: ["Login", "Logout"],
      handleTypeChange: jest.fn(),
      handleTimeRangeChange: jest.fn(),
      handleSearchChange: jest.fn(),
      handleClearFilters: jest.fn(),
      handlePresetSelected: jest.fn(),
      setDateFrom: jest.fn(),
      setDateTo: jest.fn(),
    });
  });

  test("renders the filter title", () => {
    render(<ActivityFilter />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  test("renders search input", () => {
    render(<ActivityFilter />);
    expect(screen.getByPlaceholderText("Search activities...")).toBeInTheDocument();
  });

  test("calls handleSearchChange on search input change", () => {
    const { getByPlaceholderText } = render(<ActivityFilter />);
    const searchInput = getByPlaceholderText("Search activities...");
    
    fireEvent.change(searchInput, { target: { value: "Test search" } });

    expect(mockUseActivityFilters().handleSearchChange).toHaveBeenCalled();
  });

  test("renders Clear button when filters are applied", () => {
    mockUseActivityFilters.mockReturnValueOnce({
      ...mockUseActivityFilters(),
      filters: { search: "test", types: [], preset: null },
    });

    render(<ActivityFilter />);
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  test("calls handleClearFilters when Clear button is clicked", () => {
    mockUseActivityFilters.mockReturnValueOnce({
      ...mockUseActivityFilters(),
      filters: { search: "test", types: ["Login"], preset: "Last 7 Days" },
    });

    render(<ActivityFilter />);
    fireEvent.click(screen.getByText("Clear"));

    expect(mockUseActivityFilters().handleClearFilters).toHaveBeenCalled();
  });
});
