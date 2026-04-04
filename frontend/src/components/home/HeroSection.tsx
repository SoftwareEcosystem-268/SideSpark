import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="text-center mb-32 max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A2BE2]/10 text-[#8A2BE2] text-sm font-medium mb-6 animate-bounce">
        <Sparkles className="w-4 h-4" />
        <span>Smart Side Hustle Tool for Students</span>
      </div>
      
      <h1 className="mb-8 text-[clamp(2.5rem,8vw,5.5rem)] font-[900] tracking-tight leading-[0.95] text-[#0F172A] dark:text-white">
        เปลี่ยน <span className="text-[#8A2BE2]">เวลาว่าง</span> <br /> 
        ให้เป็น <span className="relative">
          <span className="relative z-10 bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">รายได้ที่ยั่งยืน</span>
          <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#10B981]/20 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
          </svg>
        </span>
      </h1>

      <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        แพลตฟอร์มที่ช่วยให้นักศึกษาจัดการงานโปรเจกต์ วางแผนการเงิน 
        และค้นหาไอเดียทำเงินจากทักษะที่คุณมี "เริ่มจากศูนย์สู่มือโปร"
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button size="lg" className="w-full sm:w-auto text-lg px-10 bg-[#0F172A] dark:bg-white dark:text-[#0F172A] hover:opacity-90 h-14 rounded-xl shadow-xl transition-all hover:scale-105">
          เริ่มสร้างโปรเจกต์เลย
        </Button>
        <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg px-8 h-14 rounded-xl border border-gray-200 dark:border-gray-800">
          ดูวิธีการใช้งาน
        </Button>
      </div>
    </div>
  )
}