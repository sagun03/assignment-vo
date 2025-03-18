import { render, screen } from "@testing-library/react";
import { ActivityIconProps } from "@/lib/types";
import { ActivityIcon } from "../activity-icon";

describe("ActivityIcon Component", () => {
  const iconCases: { type: ActivityIconProps["type"] }[] = [
    { type: "pageView" },
    { type: "click" },
    { type: "formSubmission" },
    { type: "error" },
    { type: "apiCall" },
  ];

  test.each(iconCases)("renders correct icon for type '%s'", ({ type }) => {
    render(<ActivityIcon type={type} />);
    expect(screen.getByTestId(type)).toBeInTheDocument();
  });

  test("returns null for unknown type", () => {
    const { container } = render(<ActivityIcon type={"unknownType" as any} />);
    expect(container.firstChild).toBeNull();
  });
});
