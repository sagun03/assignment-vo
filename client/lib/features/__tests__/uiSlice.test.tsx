import uiReducer, { setTheme, toggleTheme } from "../uiSlice";
import { UiState } from "@/lib/types";

describe("uiSlice", () => {
  let initialState: UiState;

  beforeEach(() => {
    initialState = { theme: "light" };
    // Mock localStorage
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  test("should return the initial state", () => {
    expect(uiReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  test("should handle setTheme action", () => {
    const newState = uiReducer(initialState, setTheme("dark"));
    expect(newState.theme).toBe("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  test("should handle toggleTheme action", () => {
    const stateLight: UiState = { theme: "light" };
    const newStateDark = uiReducer(stateLight, toggleTheme());
    expect(newStateDark.theme).toBe("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");

    const stateDark: UiState = { theme: "dark" };
    const newStateLight = uiReducer(stateDark, toggleTheme());
    expect(newStateLight.theme).toBe("light");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });
});
