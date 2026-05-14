/** @jsxImportSource @/test-utils */
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"
import HeroSection from "@/components/home/HeroSection"

describe("HeroSection", () => {
  it("renders main heading with correct text", () => {
    render(<HeroSection />)
    expect(screen.getByText("เปลี่ยน")).toBeInTheDocument()
    expect(screen.getByText("เวลาว่าง")).toBeInTheDocument()
    expect(screen.getByText("ให้เป็น")).toBeInTheDocument()
    expect(screen.getByText("รายได้ที่ยั่งยืน")).toBeInTheDocument()
  })

  it("highlights 'เวลาว่าง' in purple", () => {
    render(<HeroSection />)
    const highlightedText = screen.getByText("เวลาว่าง")
    expect(highlightedText).toHaveClass("text-[#8A2BE2]")
  })

  it("highlights 'รายได้ที่ยั่งยืน' with gradient", () => {
    render(<HeroSection />)
    const gradientText = screen.getByText("รายได้ที่ยั่งยืน")
    expect(gradientText).toHaveClass("bg-gradient-to-r")
    expect(gradientText).toHaveClass("from-[#10B981]")
    expect(gradientText).toHaveClass("to-[#059669]")
  })

  it("displays subtitle description", () => {
    render(<HeroSection />)
    const subtitle = screen.getByText(/แพลตฟอร์มที่ช่วยให้นักศึกษาจัดการงานโปรเจกต์ วางแผนการเงิน/)
    expect(subtitle).toBeInTheDocument()
  })

  it("renders CTA button to register", () => {
    render(<HeroSection />)
    const registerButton = screen.getByRole("link", { name: "เริ่มต้นใช้งานเลย" })
    expect(registerButton).toBeInTheDocument()
    expect(registerButton).toHaveAttribute("href", "/register")
  })

  it("renders secondary button for usage guide", () => {
    render(<HeroSection />)
    const guideButton = screen.getByRole("button", { name: "ดูวิธีการใช้งาน" })
    expect(guideButton).toBeInTheDocument()
  })

  it("displays sparkles icon in badge", () => {
    render(<HeroSection />)
    const badge = screen.getByText("Smart Side Hustle Tool for Students")
    expect(badge).toBeInTheDocument()
  })

  it("has correct layout classes", () => {
    const { container } = render(<HeroSection />)
    const containerDiv = container.querySelector("div.text-center")
    expect(containerDiv).toHaveClass("max-w-5xl")
    expect(containerDiv).toHaveClass("mx-auto")
  })

  it("register button has correct styling", () => {
    render(<HeroSection />)
    const registerLink = screen.getByRole("link", { name: "เริ่มต้นใช้งานเลย" })
    expect(registerLink).toBeInTheDocument()
    // Button uses asChild prop, so the Link element itself has the styling
    expect(registerLink).toHaveClass("bg-[#8A2BE2]")
    expect(registerLink).toHaveClass("rounded-xl")
  })

  it("secondary button has ghost variant", () => {
    render(<HeroSection />)
    const guideButton = screen.getByRole("button", { name: "ดูวิธีการใช้งาน" })
    expect(guideButton).toHaveClass("bg-transparent")
  })

  it("has responsive heading with clamp", () => {
    const { container } = render(<HeroSection />)
    const heading = container.querySelector("h1")
    expect(heading).toHaveClass("text-[clamp(2.5rem,8vw,5.5rem)]")
  })

  it("subtitle has correct max-width", () => {
    const { container } = render(<HeroSection />)
    const subtitle = screen.getByText(/แพลตฟอร์มที่ช่วยให้นักศึกษาจัดการงานโปรเจกต์/)
    expect(subtitle).toHaveClass("max-w-2xl")
  })

  it("displays 'เริ่มจากศูนย์สู่มือโปร' text", () => {
    render(<HeroSection />)
    const subtitle = screen.getByText(/แพลตฟอร์มที่ช่วยให้นักศึกษาจัดการงานโปรเจกต์/)
    expect(subtitle.textContent).toContain("เริ่มจากศูนย์สู่มือโปร")
  })

  it("badge has animate-bounce class", () => {
    const { container } = render(<HeroSection />)
    const badge = container.querySelector(".animate-bounce")
    expect(badge).toBeInTheDocument()
  })
})