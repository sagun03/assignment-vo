import { render, screen } from "@testing-library/react";
import { ActivityBadgeProps } from "@/lib/types";
import { ActivityBadge } from "../activity-badge";

describe("ActivityBadge Component", () => {
  const badgeCases: { type: ActivityBadgeProps["type"]; expectedText: string }[] = [
    { type: "pageView", expectedText: "Page View" },
    { type: "click", expectedText: "Click" },
    { type: "formSubmission", expectedText: "Form" },
    { type: "error", expectedText: "Error" },
    { type: "apiCall", expectedText: "API" },
  ];

  test.each(badgeCases)("renders correct badge for type '%s'", ({ type, expectedText }) => {
    render(<ActivityBadge type={type} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test("returns null for unknown type", () => {
    const { container } = render(<ActivityBadge type={"unknownType" as any} />);
    expect(container.firstChild).toBeNull();
  });
});
