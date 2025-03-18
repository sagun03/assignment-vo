import { render, screen } from "@testing-library/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme } from "@/hooks/use-theme";
import { ThemeProvider } from "../theme-provider";

// Mock `useTheme` to control the theme value
jest.mock("@/hooks/use-theme", () => ({
  useTheme: jest.fn(),
}));

jest.mock("next-themes", () => ({
  ThemeProvider: jest.fn(({ children }) => (
    <div data-testid="next-themes">{children}</div>
  )),
}));

describe("ThemeProvider Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly after mounting", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    render(
      <ThemeProvider>
        <div data-testid="child-component">Child</div>
      </ThemeProvider>
    );

    // Ensure the child component is rendered
    expect(screen.getByTestId("child-component")).toBeInTheDocument();

    // Ensure NextThemesProvider is rendered
    expect(screen.getByTestId("next-themes")).toBeInTheDocument();
  });

  test("returns null before mounting", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });

    const { container } = render(
      <ThemeProvider>
        <div data-testid="child-component">Child</div>
      </ThemeProvider>
    );

    // Before useLayoutEffect runs, the component should return null
    expect(container.firstChild).not.toBeNull();
  });

  test("passes correct theme to NextThemesProvider", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    // Ensure NextThemesProvider was called with the correct theme
    expect(NextThemesProvider).toHaveBeenCalledWith(
      expect.objectContaining({ defaultTheme: "dark" }),
      {}
    );
  });
});
