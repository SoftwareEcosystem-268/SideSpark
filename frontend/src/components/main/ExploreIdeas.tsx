// components/main/ExploreIdeas.tsx
"use client"
import { useState, KeyboardEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, ChevronRight, CheckCircle2 } from "lucide-react"

// --- Types ---
type Skill = { label: string; colorClass: string }
type Idea = {
  id: number
  title: string
  description: string
  difficulty: "เริ่มต้นง่าย" | "ปานกลาง" | "ยาก"
  income: string
  tags: string[]
  matchKeywords: string[]
}

// --- Color palette for skill tags (cycles through) ---
const TAG_COLORS = [
  { bg: "bg-[#EEEDFE]", text: "text-[#3C3489]", border: "border-[#AFA9EC]" },
  { bg: "bg-[#E1F5EE]", text: "text-[#085041]", border: "border-[#5DCAA5]" },
  { bg: "bg-[#FAECE7]", text: "text-[#712B13]", border: "border-[#F0997B]" },
  { bg: "bg-[#E6F1FB]", text: "text-[#0C447C]", border: "border-[#85B7EB]" },
  { bg: "bg-[#EAF3DE]", text: "text-[#27500A]", border: "border-[#97C459]" },
]

// --- Mock Data ---
const ALL_IDEAS: Idea[] = [
  {
    id: 1,
    title: "รับทำพรีเซนต์ด้วย Canva",
    description: "รับทำสไลด์งานกลุ่มหรือสัมมนาให้นักศึกษาและวัยทำงาน มี Template ให้เลือก",
    difficulty: "เริ่มต้นง่าย",
    income: "฿300 – ฿1,500",
    tags: ["Canva", "การออกแบบ"],
    matchKeywords: ["canva", "การออกแบบ", "design"],
  },
  {
    id: 2,
    title: "รับถ่ายรูปสินค้าลง Shopee/TikTok",
    description: "รับถ่ายภาพสินค้าจัดเซตสวยๆ สำหรับร้านค้าออนไลน์ขนาดเล็ก ใช้กล้องมือถือก็เริ่มได้",
    difficulty: "ปานกลาง",
    income: "฿500 – ฿3,000",
    tags: ["การถ่ายภาพ"],
    matchKeywords: ["การถ่ายภาพ", "ถ่ายภาพ", "photography"],
  },
  {
    id: 3,
    title: "รับออกแบบโลโก้ SME",
    description: "รับจ้างออกแบบโลโก้สำหรับร้านค้าเล็กและธุรกิจที่เพิ่งเริ่มต้น เน้นงานไวและสวยงาม",
    difficulty: "ยาก",
    income: "฿5,000 – ฿15,000",
    tags: ["การออกแบบ"],
    matchKeywords: ["การออกแบบ", "design", "illustrator", "canva"],
  },
  {
    id: 4,
    title: "สอนพิเศษออนไลน์",
    description: "สอนวิชาที่ถนัดผ่าน Zoom หรือ Google Meet รับนักเรียน ม.ต้น ถึงมหาวิทยาลัย",
    difficulty: "เริ่มต้นง่าย",
    income: "฿200 – ฿600/ชม.",
    tags: ["สอน", "ออนไลน์"],
    matchKeywords: ["สอน", "teaching", "education"],
  },
  {
    id: 5,
    title: "ตัดต่อวิดีโอ Reels/Shorts",
    description: "ตัดต่อคลิปสั้นสำหรับ Instagram Reels, TikTok และ YouTube Shorts ให้แบรนด์หรือ Content Creator",
    difficulty: "ปานกลาง",
    income: "฿800 – ฿4,000",
    tags: ["ตัดต่อ", "วิดีโอ"],
    matchKeywords: ["ตัดต่อ", "video", "premiere", "capcut"],
  },
  {
    id: 6,
    title: "เขียน Content โซเชียล",
    description: "เขียนแคปชั่น โพสต์ Facebook/IG ให้ร้านค้าออนไลน์ SME และ Startup",
    difficulty: "เริ่มต้นง่าย",
    income: "฿300 – ฿2,000",
    tags: ["เขียน", "Content"],
    matchKeywords: ["เขียน", "copywriting", "content", "social media"],
  },
]

// --- Helpers ---
let colorCursor = 0
const assignedColors: Record<string, string> = {}

function getTagColorClass(label: string): string {
  if (!assignedColors[label]) {
    const c = TAG_COLORS[colorCursor % TAG_COLORS.length]
    assignedColors[label] = `${c.bg} ${c.text} ${c.border}`
    colorCursor++
  }
  return assignedColors[label]
}

function matchScore(idea: Idea, skills: Skill[]): number {
  const skillLabels = skills.map((s) => s.label.toLowerCase())
  return idea.matchKeywords.filter((kw) =>
    skillLabels.some((u) => u.includes(kw) || kw.includes(u))
  ).length
}

const DIFFICULTY_STYLE: Record<string, string> = {
  "เริ่มต้นง่าย": "bg-[#EAF3DE] text-[#3B6D11]",
  ปานกลาง: "bg-[#FAEEDA] text-[#854F0B]",
  ยาก: "bg-[#FCEBEB] text-[#A32D2D]",
}

// --- Component ---
export default function ExploreIdeas() {
  const [skills, setSkills] = useState<Skill[]>([
    { label: "การออกแบบ", colorClass: getTagColorClass("การออกแบบ") },
    { label: "Canva", colorClass: getTagColorClass("Canva") },
    { label: "การถ่ายภาพ", colorClass: getTagColorClass("การถ่ายภาพ") },
  ])
  const [inputValue, setInputValue] = useState("")

  const addSkill = () => {
    const val = inputValue.trim()
    if (!val) return
    if (skills.find((s) => s.label.toLowerCase() === val.toLowerCase())) {
      setInputValue("")
      return
    }
    setSkills((prev) => [...prev, { label: val, colorClass: getTagColorClass(val) }])
    setInputValue("")
  }

  const removeSkill = (label: string) => {
    setSkills((prev) => prev.filter((s) => s.label !== label))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addSkill()
  }

  const matched = ALL_IDEAS
    .map((idea) => ({ ...idea, score: matchScore(idea, skills) }))
    .filter((idea) => skills.length === 0 || idea.score > 0)
    .sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto pt-4 pb-2">
        <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-3">
          สำรวจไอเดียสร้างรายได้ 💡
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          ค้นหา Side Hustle ที่ใช่จากทักษะที่คุณมี ยิ่งระบุทักษะมาก ระบบยิ่งแนะนำได้แม่นยำ
        </p>
      </div>

      {/* Skill Management Card */}
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900/80">
        <CardContent className="p-6 space-y-5">

          {/* Add Skill Row */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              เพิ่มทักษะใหม่
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="พิมพ์ทักษะ เช่น ตัดต่อวิดีโอ, Figma, ถ่ายภาพ..."
                className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-[#7F77DD] rounded-xl"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                onClick={addSkill}
                className="bg-[#7F77DD] hover:bg-[#534AB7] text-white rounded-xl px-5 shrink-0 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                เพิ่ม
              </Button>
            </div>
          </div>

          {/* Active Skills */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              ทักษะของคุณ ({skills.length})
            </label>
            <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              {skills.length === 0 ? (
                <p className="text-sm text-gray-400 flex items-center m-auto">
                  ยังไม่มีทักษะ — ลองเพิ่มได้เลย
                </p>
              ) : (
                skills.map((skill) => (
                  <span
                    key={skill.label}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${skill.colorClass}`}
                  >
                    {skill.label}
                    <button
                      onClick={() => removeSkill(skill.label)}
                      className="ml-1 opacity-50 hover:opacity-100 transition-opacity leading-none"
                      aria-label={`ลบ ${skill.label}`}
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
          <CheckCircle2 className="w-5 h-5 text-[#1D9E75]" />
          ไอเดียที่เหมาะกับคุณ
        </h2>
        <span className="text-sm text-gray-500">พบ {matched.length} รายการ</span>
      </div>

      {/* Idea Cards Grid */}
      {matched.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-base">ยังไม่มีไอเดียที่ตรงกับทักษะของคุณ</p>
          <p className="text-sm mt-1">ลองเพิ่มทักษะใหม่ดูสิ!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {matched.map((idea) => (
            <Card
              key={idea.id}
              className="flex flex-col border-gray-200 dark:border-gray-800 hover:border-[#7F77DD]/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden rounded-2xl"
            >
              <CardHeader className="p-5 pb-3">
                <div className="mb-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${DIFFICULTY_STYLE[idea.difficulty]}`}>
                    {idea.difficulty}
                  </span>
                </div>
                <CardTitle className="text-base leading-snug group-hover:text-[#534AB7] dark:group-hover:text-[#AFA9EC] transition-colors">
                  {idea.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 pt-0 flex-1 space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                  {idea.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {idea.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">รายได้ประเมิน</p>
                  <p className="text-sm font-bold text-[#534AB7] dark:text-[#AFA9EC]">{idea.income}</p>
                </div>
                <Button
                  size="sm"
                  className="bg-[#7F77DD] hover:bg-[#534AB7] text-white rounded-xl shadow-sm transition-all active:scale-95"
                >
                  รายละเอียด
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}