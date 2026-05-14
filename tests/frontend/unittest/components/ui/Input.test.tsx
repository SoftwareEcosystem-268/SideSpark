/** @jsxImportSource @/test-utils */
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Input } from "@/components/ui/input"

describe("Input", () => {
  it("renders input with default props", () => {
    render(<Input />)
    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass("h-10")
    expect(input).toHaveClass("px-3")
    expect(input).toHaveClass("py-2")
  })

  it("renders input with placeholder", () => {
    render(<Input placeholder="Enter text..." />)
    const input = screen.getByPlaceholderText("Enter text...")
    expect(input).toBeInTheDocument()
  })

  it("renders input with custom className", () => {
    render(<Input className="custom-input" />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("custom-input")
  })

  it("renders different input types", () => {
    const { rerender, container } = render(<Input type="text" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")

    rerender(<Input type="email" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email")

    rerender(<Input type="password" />)
    const passwordInput = container.querySelector("input[type='password']")
    expect(passwordInput).toBeInTheDocument()
  })

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled />)
    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
    expect(input).toHaveClass("disabled:opacity-50")
    expect(input).toHaveClass("disabled:cursor-not-allowed")
  })

  it("is readonly when readonly prop is true", () => {
    render(<Input readOnly />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("readonly")
  })

  it("handles value changes", () => {
    render(<Input />)
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "Hello World" } })
    expect(input).toHaveValue("Hello World")
  })

  it("applies custom name attribute", () => {
    render(<Input name="username" />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("name", "username")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("has focus ring styles on focus", () => {
    render(<Input />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("focus-visible:ring-2")
    expect(input).toHaveClass("focus-visible:ring-ring")
  })
})