// components/main/ExploreIdeas.tsx
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, Plus, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react"

export default function ExploreIdeas() {
  // Mock Data: ทักษะที่ผู้ใช้มีอยู่
  const [activeSkills, setActiveSkills] = useState(["การออกแบบ", "Canva", "การถ่ายภาพ"])
  const [searchQuery, setSearchQuery] = useState("")

  // Mock Data: ไอเดียจาก Database
  const matchedIdeas = [
    {
      id: 1,
      title: "รับทำพรีเซนต์ด้วย Canva",
      description: "รับทำสไลด์งานกลุ่มหรือสไลด์สัมมนาให้นักศึกษาและวัยทำงาน มี Template ให้เลือก",
      difficulty: "เริ่มต้นง่าย",
      income: "฿300 - ฿1,500",
      skills: ["Canva", "การออกแบบ"],
    },
    {
      id: 2,
      title: "รับถ่ายรูปสินค้าลง Shopee/TikTok",
      description: "รับถ่ายภาพสินค้าจัดเซตสวยๆ สำหรับร้านค้าออนไลน์ขนาดเล็ก ใช้กล้องมือถือก็เริ่มได้",
      difficulty: "ปานกลาง",
      income: "฿500 - ฿3,000",
      skills: ["การถ่ายภาพ"],
    },
    {
      id: 3,
      title: "รับออกแบบโลโก้ SME",
      description: "รับจ้างออกแบบโลโก้สำหรับร้านค้าเล็กและธุรกิจที่เพิ่งเริ่มต้น เน้นงานไวและสวยงาม",
      difficulty: "ยาก",
      income: "฿5,000 - ฿15,000",
      skills: ["การออกแบบ"],
    }
  ]

  const removeSkill = (skillToRemove: string) => {
    setActiveSkills(activeSkills.filter(s => s !== skillToRemove))
  }

  const getDifficultyColor = (level: string) => {
    if (level === "เริ่มต้นง่าย") return "bg-[#10B981]/10 text-[#10B981]"
    if (level === "ปานกลาง") return "bg-orange-500/10 text-orange-500"
    return "bg-red-500/10 text-red-500"
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-3">สำรวจไอเดียสร้างรายได้ 💡</h1>
        <p className="text-gray-500 dark:text-gray-400">
          ค้นหา Side Hustle ที่ใช่จากทักษะที่คุณมี ยิ่งระบุทักษะมาก ระบบยิ่งแนะนำได้แม่นยำ
        </p>
      </div>

      {/* ส่วนที่ 1: จัดการทักษะ (Skill Management) */}
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Search Bar */}
            <div className="w-full md:w-1/3 space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">เพิ่มทักษะใหม่</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="ค้นหาทักษะ... เช่น ตัดต่อวิดีโอ" 
                  className="pl-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-[#8A2BE2]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-400">พิมพ์เพื่อค้นหาทักษะจากระบบ</p>
            </div>

            {/* Active Skills List */}
            <div className="w-full md:w-2/3 space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">ทักษะของคุณ ({activeSkills.length})</label>
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 min-h-[80px]">
                {activeSkills.length === 0 ? (
                  <p className="text-sm text-gray-400 flex items-center m-auto">ยังไม่มีทักษะ ลองเพิ่มดูสิ!</p>
                ) : (
                  activeSkills.map((skill) => (
                    <div 
                      key={skill} 
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full shadow-sm group transition-all hover:border-red-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#8A2BE2]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{skill}</span>
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="ml-1 p-0.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* ส่วนที่ 2: ไอเดียที่ Match (Idea Cards) */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-[#0F172A] dark:text-white">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> ไอเดียที่เหมาะกับคุณ
          </h2>
          <span className="text-sm text-gray-500">พบ {matchedIdeas.length} รายการ</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedIdeas.map((idea) => (
            <Card key={idea.id} className="flex flex-col border-gray-200 dark:border-gray-800 hover:border-[#8A2BE2]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
              <CardHeader className="p-5 pb-3">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${getDifficultyColor(idea.difficulty)}`}>
                    {idea.difficulty}
                  </span>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-[#8A2BE2] transition-colors">
                  {idea.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-5 pt-0 flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
                  {idea.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {idea.skills.map(skill => (
                    <span key={skill} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                      #{skill}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium text-gray-400 uppercase">รายได้ประเมิน</p>
                  <p className="text-sm font-bold text-[#10B981]">{idea.income}</p>
                </div>
                <Button size="sm" className="bg-[#8A2BE2] hover:bg-[#8A2BE2]/90 rounded-lg shadow-md transition-transform active:scale-95">
                  รายละเอียด <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}