/** @jsxImportSource @/test-utils */
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"
import Navbar from "@/components/layout/Navbar"

describe("Navbar", () => {
  it("renders navbar with logo", () => {
    render(<Navbar />)
    const logo = screen.getByAltText("SideSpark Logo")
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("width", "120")
  })

  it("renders login button", () => {
    render(<Navbar />)
    const loginButton = screen.getByRole("link", { name: "เข้าสู่ระบบ" })
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveAttribute("href", "/login")
  })

  it("renders register button", () => {
    render(<Navbar />)
    const registerButton = screen.getByRole("link", { name: "เริ่มต้นใช้งาน" })
    expect(registerButton).toBeInTheDocument()
    expect(registerButton).toHaveAttribute("href", "/register")
  })

  it("has correct styling classes", () => {
    const { container } = render(<Navbar />)
    const nav = container.querySelector("nav")
    expect(nav).toHaveClass("sticky")
    expect(nav).toHaveClass("top-0")
    expect(nav).toHaveClass("z-50")
  })

  it("has logo with correct styling", () => {
    render(<Navbar />)
    const logoContainer = screen.getByAltText("SideSpark Logo").parentElement
    expect(logoContainer).toHaveClass("hover:opacity-90")
    expect(logoContainer).toHaveClass("transition-opacity")
    expect(logoContainer).toHaveClass("cursor-pointer")
  })

  it("login button has ghost variant", () => {
    render(<Navbar />)
    const loginLink = screen.getByRole("link", { name: "เข้าสู่ระบบ" })
    const loginButton = loginLink.querySelector("button")
    expect(loginButton).toHaveClass("hover:text-[#8A2BE2]")
  })

  it("register button has primary style with purple background", () => {
    render(<Navbar />)
    const registerButton = screen.getByRole("link", { name: "เริ่มต้นใช้งาน" }).querySelector("button")
    expect(registerButton).toHaveClass("bg-[#8A2BE2]")
  })

  it("logo image has correct source", () => {
    render(<Navbar />)
    const logo = screen.getByAltText("SideSpark Logo")
    expect(logo).toHaveAttribute("src", "/images/logo.jpg")
  })
})