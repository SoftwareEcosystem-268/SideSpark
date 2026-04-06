// components/main/MainDashboard.tsx
"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Check, Plus, Loader2 } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  difficulty: string
  description: string
  estimatedIncomeMin: number
  estimatedIncomeMax: number
}

export default function MainDashboard() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. ดึงทักษะและไอเดียที่แนะนำจาก Express Backend
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ideas', { cache: 'no-store' })
        const data: Recommendation[] = await res.json()
        setRecommendations(data)
      } catch (err) {
        console.error("Failed to fetch ideas", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Sidebar: ทักษะของฉัน */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="border-none shadow-sm bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Check className="w-5 h-5 text-[#10B981]" /> ทักษะของฉัน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {/* ตัวอย่างทักษะ - ในงานจริงจะดึงจาก /api/skills/user */}
              {['การออกแบบ', 'Canva'].map(s => (
                <span key={s} className="px-3 py-1 bg-[#8A2BE2]/10 text-[#8A2BE2] rounded-full text-sm font-medium">
                  {s}
                </span>
              ))}
              <Button variant="outline" size="sm" className="rounded-full border-dashed">
                <Plus className="w-3 h-3 mr-1" /> เพิ่มทักษะ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main: แนะนำไอเดียทำเงิน (Idea Explorer) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#FFD600]" /> ไอเดียที่เหมาะกับคุณ
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#8A2BE2]" /></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((idea) => (
              <Card key={idea.id} className="group hover:border-[#8A2BE2] transition-all cursor-pointer overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-[#8A2BE2] transition-colors">
                      {idea.title}
                    </CardTitle>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                      {idea.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{idea.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[#10B981] font-bold">
                      ฿{idea.estimatedIncomeMin.toLocaleString()} - {idea.estimatedIncomeMax.toLocaleString()}
                    </span>
                    <Button size="sm" className="bg-[#8A2BE2] hover:bg-[#8A2BE2]/90">
                      เริ่มเลย
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
