/** @jsxImportSource @/test-utils */
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("renders button with default props", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: "Click me" })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("h-10")
    expect(button).toHaveClass("px-4")
    expect(button).toHaveClass("py-2")
  })

  it("renders button with custom className", () => {
    render(<Button className="custom-class">Click me</Button>)
    const button = screen.getByRole("button", { name: "Click me" })
    expect(button).toHaveClass("custom-class")
  })

  it("renders different variants", () => {
    const { rerender } = render(<Button variant="default">Default</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-primary")

    rerender(<Button variant="destructive">Destructive</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-destructive")

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole("button")).toHaveClass("border")

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-secondary")

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent")

    rerender(<Button variant="link">Link</Button>)
    expect(screen.getByRole("button")).toHaveClass("underline-offset-4")
  })

  it("renders different sizes", () => {
    const { rerender } = render(<Button size="default">Default</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-10")

    rerender(<Button size="sm">Small</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-9")

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-11")

    rerender(<Button size="icon">Icon</Button>)
    expect(screen.getByRole("button")).toHaveClass("w-10")
  })

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button", { name: "Disabled" })
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:opacity-50")
    expect(button).toHaveClass("disabled:pointer-events-none")
  })

  it("applies custom type attribute", () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByRole("button", { name: "Submit" })
    expect(button).toHaveAttribute("type", "submit")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})