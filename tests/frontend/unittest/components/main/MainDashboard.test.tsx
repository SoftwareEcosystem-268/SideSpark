/** @jsxImportSource @/test-utils */
import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, expect, it, vi } from "vitest"
import MainDashboard from "@/components/main/MainDashboard"

const {
  mockIdeasGetAll,
} = vi.hoisted(() => ({
  mockIdeasGetAll: vi.fn(),
}))

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api")
  return {
    ...actual,
    api: {
      ...actual.api,
      ideas: {
        ...actual.api.ideas,
        getAll: mockIdeasGetAll,
      },
    },
  }
})

function createResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  })
}

const mockIdeas = [
  {
    id: "idea-1",
    title: "รับทำพรีเซนต์ด้วย Canva",
    description: "รับทำสไลด์งานให้ลูกค้าและนักศึกษา",
    skills: ["Canva", "การออกแบบ"],
    difficulty: "easy",
    estimatedIncome: {
      min: 300,
      max: 1500,
      unit: "THB",
    },
    timeToStart: "1 วัน",
    requiredTools: ["Canva"],
    resources: [],
    matchedSkills: ["Canva", "การออกแบบ"],
    matchCount: 2,
    recommendationSource: "saved-skills",
  },
  {
    id: "idea-2",
    title: "รับออกแบบโลโก้",
    description: "ออกแบบโลโก้ให้ธุรกิจขนาดเล็ก",
    skills: ["การออกแบบ"],
    difficulty: "medium",
    estimatedIncome: {
      min: 500,
      max: 2000,
      unit: "THB",
    },
    timeToStart: "2 วัน",
    requiredTools: ["Figma", "Illustrator"],
    resources: [],
    matchedSkills: ["การออกแบบ"],
    matchCount: 1,
    recommendationSource: "saved-skills",
  },
]

describe("MainDashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIdeasGetAll.mockResolvedValue(createResponse(mockIdeas))
  })

  it("shows loading state initially", () => {
    mockIdeasGetAll.mockImplementation(() => new Promise(() => {}))
    const { container } = render(<MainDashboard />)

    const loader = container.querySelector(".animate-spin")
    expect(loader).toBeInTheDocument()
  })

  it("displays skill section with title", () => {
    render(<MainDashboard />)
    expect(screen.getByText("ทักษะของฉัน")).toBeInTheDocument()
  })

  it("displays default skills", () => {
    render(<MainDashboard />)
    expect(screen.getByText("การออกแบบ")).toBeInTheDocument()
    expect(screen.getByText("Canva")).toBeInTheDocument()
  })

  it("displays add skill button", () => {
    render(<MainDashboard />)
    expect(screen.getByRole("button", { name: /เพิ่มทักษะ/ })).toBeInTheDocument()
  })

  it("displays ideas section title", () => {
    render(<MainDashboard />)
    expect(screen.getByText("ไอเดียที่เหมาะกับคุณ")).toBeInTheDocument()
  })

  it("renders idea cards with correct information", async () => {
    render(<MainDashboard />)

    await waitFor(() => {
      expect(screen.getByText("รับทำพรีเซนต์ด้วย Canva")).toBeInTheDocument()
      expect(screen.getByText("รับออกแบบโลโก้")).toBeInTheDocument()
    })
  })

  it("displays income range in Thai format", async () => {
    render(<MainDashboard />)

    await waitFor(() => {
      expect(screen.getByText("฿300 - 1,500")).toBeInTheDocument()
      expect(screen.getByText("฿500 - 2,000")).toBeInTheDocument()
    })
  })

  it("displays difficulty badges", async () => {
    render(<MainDashboard />)

    await waitFor(() => {
      expect(screen.getByText("easy")).toBeInTheDocument()
      expect(screen.getByText("medium")).toBeInTheDocument()
    })
  })

  it("displays start button on each idea card", async () => {
    render(<MainDashboard />)

    await waitFor(() => {
      const startButtons = screen.getAllByRole("button", { name: "เริ่มเลย" })
      expect(startButtons).toHaveLength(2)
    })
  })

  it("calls API to fetch ideas on mount", async () => {
    render(<MainDashboard />)

    await waitFor(() => {
      expect(mockIdeasGetAll).toHaveBeenCalledTimes(1)
    })
  })

  it("displays idea description", async () => {
    render(<MainDashboard />)

    await waitFor(() => {
      expect(screen.getByText(/รับทำสไลด์งานให้ลูกค้าและนักศึกษา/)).toBeInTheDocument()
    })
  })

  it("has correct styling on skill badges", () => {
    render(<MainDashboard />)
    const skillBadges = screen.getAllByText(/การออกแบบ|Canva/)
    skillBadges.forEach(badge => {
      expect(badge).toHaveClass("rounded-full")
    })
  })

  it("has responsive grid layout", async () => {
    render(<MainDashboard />)

    await waitFor(() => {
      const heading = screen.getByText("ไอเดียที่เหมาะกับคุณ")
      const container = heading.closest("div")?.parentElement?.querySelector(".grid")
      expect(container).toHaveClass("grid")
      expect(container).toHaveClass("gap-4")
    })
  })

  it("shows empty state when no ideas", async () => {
    mockIdeasGetAll.mockResolvedValue(createResponse([]))
    render(<MainDashboard />)

    await waitFor(() => {
      expect(screen.queryByText("รับทำพรีเซนต์ด้วย Canva")).not.toBeInTheDocument()
    })
  })
})