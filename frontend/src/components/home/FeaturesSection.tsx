import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Target } from "lucide-react"

export default function FeturesSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-24">
      <Card className="group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FFD600]/10 border-none bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardHeader>
          <div className="w-14 h-14 rounded-2xl bg-[#FFD600]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Lightbulb className="h-7 w-7 text-[#FFD600]" />
          </div>
          <CardTitle className="text-xl">ค้นหาไอเดียทำเงิน</CardTitle>
          <CardDescription className="text-base mt-2">
            เลือกทักษะที่คุณมี ระบบจะวิเคราะห์และแนะนำไอเดียที่เหมาะสมพร้อมประเมินรายได้ล่วงหน้า
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8A2BE2]/10 border-none bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardHeader>
          <div className="w-14 h-14 rounded-2xl bg-[#8A2BE2]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Target className="h-7 w-7 text-[#8A2BE2]" />
          </div>
          <CardTitle className="text-xl">วางแผนโปรเจกต์</CardTitle>
          <CardDescription className="text-base mt-2">
            กำหนดเป้าหมาย สร้าง To-do list แยกย่อยงานที่ต้องทำ เพื่อให้คุณไม่พลาดทุกเดดไลน์
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#10B981]/10 border-none bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardHeader>
          <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="h-7 w-7 text-[#10B981]" />
          </div>
          <CardTitle className="text-xl">ติดตามรายได้</CardTitle>
          <CardDescription className="text-base mt-2">
            บันทึกบัญชีรายรับ-รายจ่าย ดูสรุปผลกำไรแบบกราฟที่เข้าใจง่ายในหน้าเดียว
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}