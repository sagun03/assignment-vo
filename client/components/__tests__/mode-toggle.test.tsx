import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { toggleTheme } from "@/lib/features/uiSlice";
import { ModeToggle } from "../mode-toggle";

const mockStore = configureStore([]);

describe("ModeToggle Component", () => {
    let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      ui: { theme: "light" },
    });
    store.dispatch = jest.fn();
  });

  test("renders the mode toggle button", () => {
    render(
      <Provider store={store}>
        <ModeToggle />
      </Provider>
    );

    const button = screen.getByTestId("mode-toggle-button");
    expect(button).toBeInTheDocument();
  });

  test("displays Moon icon when theme is light", () => {
    render(
      <Provider store={store}>
        <ModeToggle />
      </Provider>
    );

    expect(screen.getByTestId("mode-toggle-button")).toContainHTML("lucide-moon");
  });

  test("dispatches toggleTheme action on click", () => {
    render(
      <Provider store={store}>
        <ModeToggle />
      </Provider>
    );

    const button = screen.getByTestId("mode-toggle-button");
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(toggleTheme());
  });
});