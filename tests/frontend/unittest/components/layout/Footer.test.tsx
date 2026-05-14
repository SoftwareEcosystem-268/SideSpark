/** @jsxImportSource @/test-utils */
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"
import Footer from "@/components/layout/Footer"

describe("Footer", () => {
  it("renders footer with logo", () => {
    render(<Footer />)
    const logo = screen.getByAltText("SideSpark Logo")
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("width", "120")
  })

  it("renders description text", () => {
    render(<Footer />)
    const description = screen.getByText(/แอปที่ช่วยให้นักศึกษาไทยเริ่มต้นทำโปรเจกต์และหารายได้เสริมได้อย่างเป็นระบบ/)
    expect(description).toBeInTheDocument()
  })

  it("renders main menu section with correct heading", () => {
    render(<Footer />)
    const heading = screen.getByText("เมนูหลัก")
    expect(heading).toBeInTheDocument()
  })

  it("renders all menu links", () => {
    render(<Footer />)
    expect(screen.getByRole("link", { name: "ฟีเจอร์" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "ราคา" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "บทความ" })).toBeInTheDocument()
  })

  it("renders social media section with correct heading", () => {
    render(<Footer />)
    const heading = screen.getByText("ติดตามเรา")
    expect(heading).toBeInTheDocument()
  })

  it("renders all social media links", () => {
    render(<Footer />)
    expect(screen.getByAltText("Facebook")).toBeInTheDocument()
    expect(screen.getByAltText("Instagram")).toBeInTheDocument()
    expect(screen.getByAltText("YouTube")).toBeInTheDocument()
  })

  it("renders copyright text", () => {
    render(<Footer />)
    const copyright = screen.getByText(/© 2026 SideSpark. สงวนลิขสิทธิ์/)
    expect(copyright).toBeInTheDocument()
  })

  it("has correct footer styling classes", () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector("footer")
    expect(footer).toHaveClass("border-t")
    expect(footer).toHaveClass("bg-[#F8FAFC]")
  })

  it("social media links have correct hover effects", () => {
    render(<Footer />)
    const facebookLink = screen.getByAltText("Facebook").parentElement
    expect(facebookLink).toHaveClass("rounded-full")
    expect(facebookLink).toHaveClass("hover:-translate-y-1")
  })

  it("logo in footer has correct attributes", () => {
    render(<Footer />)
    const logo = screen.getByAltText("SideSpark Logo")
    expect(logo).toHaveAttribute("src", "/images/logo.jpg")
    expect(logo).toHaveClass("hover:opacity-90")
  })

  it("menu links have purple hover color", () => {
    render(<Footer />)
    const menuLinks = screen.getAllByRole("link")
    menuLinks.forEach(link => {
      const text = link.textContent
      if (["ฟีเจอร์", "ราคา", "บทความ"].includes(text || "")) {
        expect(link).toHaveClass("hover:text-[#8A2BE2]")
      }
    })
  })

  it("footer has responsive grid layout", () => {
    const { container } = render(<Footer />)
    const grid = container.querySelector("div.grid")
    expect(grid).toHaveClass("md:grid-cols-4")
    expect(grid).toHaveClass("gap-8")
  })
})