import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ParakitProvider } from "../../providers/ParakitProvider";
import { Button } from "./Button";

// Helper to render with provider
function renderWithProvider(ui: React.ReactElement) {
  return render(
    <ParakitProvider config={{ sounds: false }}>{ui}</ParakitProvider>
  );
}

describe("Button", () => {
  it("renders children correctly", () => {
    renderWithProvider(<Button>Click me</Button>);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn(); // vi.fn() creates a mock function

    renderWithProvider(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();

    renderWithProvider(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByText("Click me"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies variant class correctly", () => {
    renderWithProvider(<Button variant="secondary">Click me</Button>);

    const button = screen.getByText("Click me");

    expect(button.className).toContain("secondary");
  });
});
